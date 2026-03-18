import {
    getAllFoods,
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
import {foodSchema} from "../food-items/schema.ts";


export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const dailyDiaries = await getDailyMeals(user.id, getCurrentDateInDbFormat());
    const foods = await getAllFoods()
    return {
        userId: user.id,
        dailyDiaries,
        foods,
        form: await superValidate(zod4(dailyMealSchema)),
        foodForm: await superValidate(zod4(foodSchema)),
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

        try {
            if (form.data.userId) {
                const [diaryDay] = await getDiaryDay(form.data.userId, getCurrentDateInDbFormat())

                if (diaryDay) {
                    const [meal] = await getMealByDiaryDayAndMealType(diaryDay.id, form.data.mealType)
                    if (meal) {
                        await mealEntryInsertTransaction(
                            form.data.userId,
                            diaryDay.date,
                            form.data.mealType,
                            diaryDay.id,
                            meal.id,
                            form.data.foodItems
                        )

                    } else {
                        await mealEntryInsertTransaction(
                            form.data.userId,
                            diaryDay.date,
                            form.data.mealType,
                            diaryDay.id,
                            undefined,
                            form.data.foodItems
                        )
                    }
                } else {
                    await mealEntryInsertTransaction(
                        form.data.userId,
                        getCurrentDateInDbFormat(),
                        form.data.mealType,
                        undefined,
                        undefined,
                        form.data.foodItems
                    )
                }

            } else {
                throw new Error("User not found")
            }
        }catch (err: any) {
            console.error("❌ ERREUR TRANSACTION :", err.message)
            console.error("Détails PostgreSQL :", err.detail)
            throw err

        }

    }
}