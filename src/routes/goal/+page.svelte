<script lang="ts">
    import MealCollapsible from "@/components/meal/meal-collapsible.svelte";
    import SideSheet from "@/components/form/side-sheet.svelte";
    import DailyMealForm from "@/components/form/daily-meal-form.svelte";
    import {Card} from "@/components/ui/card";
    import {columns} from "../weight/columns.ts";
    import DataTable from "@/components/table/data-table.svelte";
    import NutritionGoalForm from "@/components/form/nutrition-goal-form.svelte";

    let {data} = $props();
    console.log(data)
</script>

<SideSheet title="Change current goal" textButton="Change current goal">
    <NutritionGoalForm {data}/>
</SideSheet>
<DataTable data={data.oldGoals} {columns}/>