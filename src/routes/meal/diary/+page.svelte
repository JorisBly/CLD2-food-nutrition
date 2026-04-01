<script lang="ts">
    import MealCollapsible from "@/components/meal/meal-collapsible.svelte";
    import SideSheet from "@/components/form/side-sheet.svelte";
    import WeightForm from "@/components/form/weight-form.svelte";
    import DailyMealForm from "@/components/form/daily-meal-form.svelte";
    import {Card} from "@/components/ui/card";

    let {data} = $props();

</script>

<SideSheet title="Ajouter une entrée" textButton="Nouvelle entrée">
    <DailyMealForm {data} />
</SideSheet>
<Card title="Ajouter une entrée">
    <div class="flex flex-row">
    <MealCollapsible title="Déjeuner" mealType="breakfast" items={data.dailyDiaries !== null ? data.dailyDiaries.meals : []} />
    <MealCollapsible title="Diner" mealType="lunch" items={data.dailyDiaries !== null ? data.dailyDiaries.meals : []}/>
    <MealCollapsible title="Souper" mealType="dinner" items={data.dailyDiaries !== null ? data.dailyDiaries.meals : []}/>
    <MealCollapsible title="Encas" mealType="snack" items={data.dailyDiaries !== null ? data.dailyDiaries.meals : []}/>
    </div>
</Card>