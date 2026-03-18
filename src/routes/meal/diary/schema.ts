import { z } from "zod";


const foodItem = z.object({
    id: z.string(),
    quantity: z.float32().min(0),
})
export const dailyMealSchema = z.object({
    userId: z.string(),
    mealType: z.string(),
    foodItems: z.array(foodItem).min(1, "Sélectionnez au moins un aliment")
});

export type FormSchema = typeof dailyMealSchema;

