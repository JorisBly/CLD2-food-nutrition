<script lang="ts">
import DataTable from "@/components/table/data-table.svelte";
import {columns} from "./columns";
import SideSheet from "@/components/form/side-sheet.svelte";
import WeightForm from "@/components/form/weight-form.svelte";

let {data} = $props();

</script>

<SideSheet title="Add an entry" textButton="New entry">
    <WeightForm {data} />
</SideSheet>
    <DataTable data={data.weights} {columns}/>