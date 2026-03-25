import type { ColumnDef } from "@tanstack/table-core";
import type {NutritionGoal} from "@/types.ts";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<NutritionGoal>[] = [
    {
        accessorKey: "startDate",
        header: "Commencement",
        cell: ({ getValue }) => {
            const value = getValue();
            if (!value) return "-";

            const date = new Date(value as string);

            return date.toISOString().split('T')[0];
        }
    },
    {
        accessorKey: "endDate",
        header: "Terminer le",
        cell: ({ getValue }) => {
            const value = getValue();
            if (!value) return "En cours...";
        }
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