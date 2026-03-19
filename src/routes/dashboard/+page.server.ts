import {getAllDailySummary, getUserMealsWithEntries, getUserWeights} from "@/server/api.ts";
import {superValidate} from "sveltekit-superforms";
import {zod4} from "sveltekit-superforms/adapters";
import {registerSchema} from "../register/schema.ts";
import * as Chart from "@/components/ui/chart";
import {calculateDailyTotals} from "@/math.ts";

export async function load({ parent }) {
    const { user } = await parent()
    if (!user) {
        throw new Error("User does not exist");
    }
    const weights = await getUserWeights(user.id);
    const diaries = await getAllDailySummary(user.id);
    const diaryChartData = calculateDailyTotals(diaries)
    return {
        charts : [
            {
                weightChartData: weights,
                macroChartData: diaryChartData,
                weightChartConfig: {
                    weight: {label: "Poids", color: "var(--primary)"},
                } satisfies Chart.ChartConfig,
                macroChartConfig: {
                    calories: { label: "Calories", color: "var(--chart-blue)" },
                    proteins: { label: "Protéines", color: "var(--chart-red)" },
                    carbs: { label: "Glucides", color: "var(--chart-green)" },
                    fats: { label: "Graisses", color: "var(--chart-yellow)" }
                    }satisfies Chart.ChartConfig,
            }
        ],
    };
}