import {type Actions, fail, redirect} from "@sveltejs/kit";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {foodSchema} from "./schema.ts";
import {createFoodItem, getAllFoods, getUserWeights} from "@/server/api.ts";
import {downloadImage} from "@/file.ts";
import {registerSchema} from "../../register/schema.ts";
import {cloudinary, uploadImage} from "@/server/cloudinary.ts";



export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const foods = await getAllFoods();
    return {
        userId: user.id,
        foods,
        form: await superValidate(zod4(foodSchema)),
    };
}

export const actions : Actions = {
    newEntry: async ({ request }) => {
        const form = await superValidate(request, zod4(foodSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }


        const imageFile = form.data.img as File;

        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            form.data.img = await uploadImage(buffer)
        }


        await  createFoodItem(form.data)

    }
}