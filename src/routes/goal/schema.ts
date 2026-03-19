import { z } from "zod";

export const goalSchema = z.object({
    userId: z.string(),
    dailyCalories: z.number().min(0).max(10000),
    targetProteins: z.number().min(0).max(10000),
    targetCarbs: z.number().min(0).max(10000),
    targetFats: z.number().min(0).max(10000),
    startDate: z.string()
});

export type FormSchema = typeof goalSchema;

