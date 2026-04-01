import type { ColumnDef } from "@tanstack/table-core";
import type {FoodItem, WeightEntry} from "@/types.ts";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FoodItem>[] = [
    {
        accessorKey: "img",
        header: "",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "calories",
        header: "Calories (100gr)",
    },
    {
        accessorKey: "proteins",
        header: "Proteines (100gr)",
    },
    {
        accessorKey: "carbs",
        header: "Fibres (100gr)",
    },
    {
        accessorKey: "fats",
        header: "Graisse (100gr)",
    },
    {
        accessorKey: "id",
        header: ""
    }
];