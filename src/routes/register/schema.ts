import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(50),
    firstname: z.string().min(3).max(50),
    lastname: z.string().min(3).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(12).max(50),
});

export type FormSchema = typeof registerSchema;

