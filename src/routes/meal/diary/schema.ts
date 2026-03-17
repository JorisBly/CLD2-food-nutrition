import { z } from "zod";

export const dailyMealSchema = z.object({
    userId: z.string(),
    date: z.iso.date(),
    mealType: z.string(),
    foodId: z.string(),
});

export type FormSchema = typeof dailyMealSchema;

