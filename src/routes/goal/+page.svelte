<script lang="ts">
    import SideSheet from "@/components/form/side-sheet.svelte";
    import {columns} from "./columns.ts";
    import DataTable from "@/components/table/data-table.svelte";
    import NutritionGoalForm from "@/components/form/nutrition-goal-form.svelte";

    let {data} = $props();
</script>

<SideSheet title="Changer objectif actuel" textButton="Change current goal">
    <NutritionGoalForm {data}/>
</SideSheet>
<DataTable data={data.oldGoals} {columns}/>