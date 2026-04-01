<script lang="ts">
import DataTable from "@/components/table/data-table.svelte";
import {columns} from "./columns.ts";
import SideSheet from "@/components/form/side-sheet.svelte";
import WeightForm from "@/components/form/weight-form.svelte";

let {data} = $props();

</script>

<SideSheet title="Ajouter" textButton="Ajouter">
    <WeightForm {data} />
</SideSheet>
    <DataTable data={data.weights} {columns} action={"/weight?/delete"}/>