<script lang="ts">
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";

    let {items, mealType, title} = $props()

    let filteredItems = $derived(items.filter((item) => {
        return  item.type === mealType
    }))

</script>

<Collapsible.Root open="true" class="w-[350px] space-y-2">
    <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold uppercase">{title}</h4>
        <Collapsible.Trigger
                class={buttonVariants({ variant: "ghost", size: "sm", class: "w-9 p-0" })}
        >
            <ChevronsUpDownIcon />
            <span class="sr-only">Toggle</span>
        </Collapsible.Trigger>
    </div>
    {#each filteredItems as meal}
     {#each meal.entries as entry, i}

    <Collapsible.Content class="space-y-2 px-3">
        <div class="rounded-md border px-4 py-3 font-mono text-sm">
        {entry.food.name} | {entry.quantity} gr
    </div>
    </Collapsible.Content>

         {/each}
        {/each}
</Collapsible.Root>