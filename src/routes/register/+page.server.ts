import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes";
import { superValidate } from "sveltekit-superforms";
import { registerSchema } from "./schema.ts";
import { zod4 } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod4(registerSchema)),
    };
};