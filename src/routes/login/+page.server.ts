import type {Actions, PageServerLoad} from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import {formSchema} from "../register/schema";
import {db} from "@/server/db";
import {users} from "@/server/db/schema/users";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod4(formSchema)),
    };
}

export const actions: Actions = {

    login: async ({ cookies, request }) => {
        console.log("cookies", cookies)
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const user = await db.select().from(users);

        return { success: true };
    },

    register: async (event) => {
        console.log(event);
        const form = await superValidate(event, zod4(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        await db.insert(users).values({
            userName: 'Andrew',
            firstName: 'Andrew',
            lastName: 'Andrew',
            password: 'wdwwwdwwddwd'});
    }
}
