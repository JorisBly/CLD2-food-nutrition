<script lang="ts">
    import MealCollapsible from "@/components/meal/meal-collapsible.svelte";
    import SideSheet from "@/components/form/side-sheet.svelte";
    import WeightForm from "@/components/form/weight-form.svelte";
    import {Card} from "@/components/ui/card";

    let {data} = $props();

</script>

<SideSheet title="Add an entry" textButton="New entry">
    <WeightForm {data} />
</SideSheet>
<Card title="Add an entry">
    <MealCollapsible/>
</Card>