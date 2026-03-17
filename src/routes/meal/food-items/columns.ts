import type { ColumnDef } from "@tanstack/table-core";
import type {WeightEntry} from "@/types.ts";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<WeightEntry>[] = [
    {
        accessorKey: "weight",
        header: "Weight (kg)",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
];