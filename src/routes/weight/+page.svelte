<script lang="ts">
import DataTable from "@/components/data-table.svelte";
import {columns} from "./columns";
import SideSheet from "@/components/side-sheet.svelte";
import WeightForm from "@/components/weight-form.svelte";

let {data} = $props();

</script>

<SideSheet title="Add an entry" textButton="New entry">
    <WeightForm {data} />
</SideSheet>
    <DataTable data={data.weights} {columns}/>