<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";

    const {choices} = $props()

    let value = $state("");

    const triggerContent = $derived(
        choices.find((c) => c.value === value)?.label ?? "Select a your choice"
    );
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
    <Select.Trigger class="w-[180px]">
        {triggerContent}
    </Select.Trigger>
    <Select.Content>
        <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {#each choices as choice (choice.value)}
                <Select.Item
                        value={choice.value}
                        label={choice.label}
                >
                    {choice.label}
                </Select.Item>
            {/each}
        </Select.Group>
    </Select.Content>
</Select.Root>