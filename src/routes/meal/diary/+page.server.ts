import {
    getDailyMeals,
    getDiaryDay,
    getMealByDiaryDayAndMealType,
    mealEntryInsertTransaction
} from "@/server/api.ts";
import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {dailyMealSchema} from "./schema.ts";
import {getCurrentDateInDbFormat, parseDate} from "@/date.ts";


export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const meals = await getDailyMeals(user.id, getCurrentDateInDbFormat());
    return {
        userId: user.id,
        meals,
        form: await superValidate(zod4(dailyMealSchema)),
    };
}

export const actions : Actions = {
    newEntry: async ({ request }) => {
        const form = await superValidate(request, zod4(dailyMealSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        debugger
        if (form.data.userId){
            const [diaryDay] = await getDiaryDay(form.data.userId,getCurrentDateInDbFormat())

            if (diaryDay){
                const [meal] = await getMealByDiaryDayAndMealType(diaryDay.id, form.data.mealType)
                if (meal){
                    await mealEntryInsertTransaction(
                        form.data.userId,
                        diaryDay.date,
                        form.data.mealType,
                        diaryDay.id,
                        meal.id
                        )

                }else{
                    await mealEntryInsertTransaction(
                        form.data.userId,
                        diaryDay.date,
                        form.data.mealType,
                        diaryDay.id,
                    )
                }
            }else{
                await mealEntryInsertTransaction(
                    form.data.userId,
                    form.data.date,
                    form.data.mealType,
                )
            }

        }else{
            throw new Error("User not found")
        }


    }
}