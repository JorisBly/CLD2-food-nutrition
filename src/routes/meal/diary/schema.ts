import { z } from "zod";

export const mealSchema = z.object({
    userId: z.string(),
    mealId: z.string(),
    date: z.iso.date()
});

export type FormSchema = typeof mealSchema;

