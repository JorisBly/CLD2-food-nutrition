import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {foodSchema} from "./schema.ts";
import {createFoodItem} from "@/server/api.ts";


export async function load({ parent }) {

}

export const actions : Actions = {
    newEntry: async ({ request }) => {
        const form = await superValidate(request, zod4(foodSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }



       await  createFoodItem(form.data)

    }
}