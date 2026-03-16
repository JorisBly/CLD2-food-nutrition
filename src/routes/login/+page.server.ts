import type {Actions, PageServerLoad} from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import {registerSchema} from "../register/schema";
import {db} from "@/server/db";
import {users} from "@/server/db/schema/users";
import {fail, redirect} from "@sveltejs/kit";
import bcrypt from "bcrypt";
import {checkUser, createCookie, createSession} from "@/server/auth";
import {loginSchema} from "./schema";
import type {User} from "@/types";
import {getUserByEmail} from "@/server/api.ts";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod4(loginSchema)),
    };
}

export const actions: Actions = {

    login: async ( {request, cookies} ) => {
        const form = await superValidate(request, zod4(loginSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }



        const user: User[] = await getUserByEmail(form.data.email)

        if (user.length === 0) {
            return fail(400, {})
        }else if(!await checkUser(user[0], form.data.password)){
            return fail(400, {})
        }



        const token = await createSession(user[0])

        await createCookie(cookies, token)

        redirect(302, '/dashboard')

        return { success: true }
    },

    register: async (event) => {
        const form = await superValidate(event, zod4(registerSchema))

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        await db.insert(users).values({
            userName: form.data.username,
            firstName: form.data.firstname,
            lastName: form.data.lastname,
            email: form.data.email,
            password: await bcrypt.hash(form.data.password, 10)})

            redirect(301, '/login')
    }


}
