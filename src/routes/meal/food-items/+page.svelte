<script lang="ts">
    import DataTable from "@/components/table/data-table.svelte";
    import {columns} from "./columns.ts";
    import SideSheet from "@/components/form/side-sheet.svelte";
    import FoodForm from "@/components/form/food-form.svelte";
    let {data} = $props();

</script>

<SideSheet title="Ajouter" textButton="Ajouter">
    <FoodForm foodForm={data.form} />
</SideSheet>
<DataTable data={data.foods} {columns} action="/meal/food-items?/delete" />