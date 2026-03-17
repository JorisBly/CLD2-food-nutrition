<script lang="ts">
    import MealCollapsible from "@/components/meal/meal-collapsible.svelte";
    import SideSheet from "@/components/form/side-sheet.svelte";
    import WeightForm from "@/components/form/weight-form.svelte";
    import DailyMealForm from "@/components/form/daily-meal-form.svelte";
    import {Card} from "@/components/ui/card";

    let {data} = $props();

</script>

<SideSheet title="Add an entry" textButton="New entry">
    <DailyMealForm {data} />
</SideSheet>
<Card title="Add an entry">
    <div class="flex flex-row">
    <MealCollapsible mealType="breakfast" items={data.meals} />
    <MealCollapsible mealType="lunch" items={data.meals}/>
    <MealCollapsible mealType="dinner" items={data.meals}/>
    <MealCollapsible mealType="snack" items={data.meals}/>
    </div>
</Card>