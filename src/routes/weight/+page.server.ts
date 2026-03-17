import {getUserWeights} from "@/server/api.ts";
import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {weightSchema} from "./schema.ts";
import {registerSchema} from "../register/schema.ts";
import {db} from "@/server/db";
import {weightEntries} from "@/server/db/schema/weight_entries.ts";


export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const weights = await getUserWeights(user.id);
    return {
        userId: user.id,
        weights,
        form: await superValidate(zod4(registerSchema)),
    };
}

export const actions : Actions = {
    newEntry: async ({ request, locals }) => {
        const form = await superValidate(request, zod4(weightSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        if (form.data.userId){
            await db.insert(weightEntries).values({
                userId: form.data.userId,
                weight: form.data.weight,
                date:form.data.date})
        }else{
            throw new Error("User not found")
        }


    }
}