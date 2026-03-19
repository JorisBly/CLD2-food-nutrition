import type { ColumnDef } from "@tanstack/table-core";
import type {NutritionGoal} from "@/types.ts";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<NutritionGoal>[] = [
    {
        accessorKey: "startDate",
        header: "Start date",
    },
    {
        accessorKey: "endDate",
        header: "End date",
    },

    {
        accessorKey: "dailyCalories",
        header: "Calories",
    },
    {
        accessorKey: "targetProteins",
        header: "Proteins",
    },
    {
        accessorKey: "targetFats",
        header: "Fats",
    },
    {
        accessorKey: "targetCarbs",
        header: "Carbs",
    },
];