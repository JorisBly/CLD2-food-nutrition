import {createFoodItem, getOldUserGoals, getUserGoalByDate, getUserWeights, insertGoal} from "@/server/api.ts";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {getCurrentDateInDbFormat} from "@/date.ts";
import {goalSchema} from "./schema.ts";
import {type Actions, fail} from "@sveltejs/kit";
import {getLocalTimeZone} from "@internationalized/date";


export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const currentGoal = await getUserGoalByDate(user.id, getCurrentDateInDbFormat())
    const oldGoals = await getOldUserGoals(user.id, getCurrentDateInDbFormat())
    return {
        userId: user.id,
        currentGoal,
        oldGoals,
        form: await superValidate(zod4(goalSchema)),
    };
}

export const actions : Actions = {
    newEntry: async ({ request }) => {
        const form = await superValidate(request, zod4(goalSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        form.data.startDate = new Date(form.data.startDate)
        await insertGoal(form.data)
    }
}