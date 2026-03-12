import {z} from "zod";

export const weightSchema = z.object({
    userId: z.string(),
    weight: z.float32().min(1).max(1000),
    date: z.iso.date(),
})

export type FormSchema = typeof weightSchema;
