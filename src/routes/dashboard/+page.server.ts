import {getUserWeights} from "@/server/api.ts";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {registerSchema} from "../register/schema.ts";
import * as Chart from "@/components/ui/chart";

export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const weights = await getUserWeights(user.id);

    return {
        charts : [
            {
                chartData: weights,
                chartConfig: {
                    weight: { label: "Weight", color: "var(--primary)" },
                } satisfies Chart.ChartConfig
            }
        ],
    };
}