import { z } from "zod";

export const foodSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    proteins: z.number().min(0),
    carbs: z.number().min(0),
    fats: z.number().min(0),
})
    .transform((data) => {
        const calculatedCalories = (data.proteins * 4) + (data.carbs * 4) + (data.fats * 9);

        return {
            ...data,
            calories: calculatedCalories
        };
    });

export type FormSchema = typeof foodSchema;