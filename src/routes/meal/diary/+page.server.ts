import {getUserMeals, getUserWeights} from "@/server/api";
import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {mealSchema} from "./schema.ts";
import {db} from "@/server/db";
import {mealEntries} from "@/server/db/schema/meal_entries.ts";


export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const meals = await getUserMeals(user.id);
    return {
        userId: user.id,
        meals,
        form: await superValidate(zod4(mealSchema)),
    };
}

export const actions : Actions = {
    newEntry: async ({ request, locals }) => {
        const form = await superValidate(request, zod4(mealSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        if (form.data.userId){
            await db.insert(mealEntries).values({
                userId: form.data.userId,
                date:form.data.date})
        }else{
            throw new Error("User not found")
        }


    }
}