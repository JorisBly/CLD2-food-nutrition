import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const foodSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    proteins: z.number().min(0),
    carbs: z.number().min(0),
    fats: z.number().min(0),
    calories: z.number().min(0),
    img: z
    .any()
})


export type FormSchema = typeof foodSchema;