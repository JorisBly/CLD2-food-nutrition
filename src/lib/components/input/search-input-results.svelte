<script lang="ts">
    import {
        Command,
        CommandInput,
        CommandList,
        CommandGroup,
        CommandEmpty,
        CommandItem,
    } from "$lib/components/ui/command";
    import {Check, Image} from "@lucide/svelte";
    import { cn } from "$lib/utils.js";
    import {Input} from "@/components/ui/input";
    import FoodDialog from "../dialog/food-dialog.svelte";
    import {getFoodImage} from "@/foodImage.ts";
    import {CldImage} from "svelte-cloudinary";



    let { foods = [], foodForm, selectedItems = $bindable([]) } = $props();
    function toggleFood(food: Object) {
        const index = selectedItems.findIndex(item => item.id === food.id);
        if (index !== -1) {
            selectedItems = selectedItems.filter(item => item.id !== food.id);
        } else {
            food.quantity = 0
            selectedItems = [...selectedItems, food];
        }
    }

    function updateQuantity(foodId: string, qty: number) {
        selectedItems = selectedItems.map(item =>
            item.id === foodId ? { ...item, quantity: qty } : item
        );
    }
</script>

<Command class="rounded-lg border shadow-md p-2">
    <CommandInput placeholder="Rechercher un aliment..." />
    <CommandList>
        <CommandEmpty>
            Aucun résultat.<br>
            Crée un nouvel aliment
            <FoodDialog {foodForm}  />
        </CommandEmpty>


        <CommandGroup heading="Aliments disponibles">
            {#each foods as food}
                {@const selectedEntry = selectedItems.find(i => i.id === food.id)}
                {@const isSelected = !!selectedEntry}
                <CommandItem
                        value={food.name}
                        onSelect={() => toggleFood(food)}
                        class="flex items-center justify-between gap-4"
                >
                    <div class="flex items-center gap-2 flex-1">
                        <CldImage
                                width="50"
                                height="50"
                                src="{food.img}"
                                alt="{food.img}"
                        />
                        <div class={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                    isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                )}>

                            {#if isSelected}
                                <Check class="h-3 w-3" />
                            {/if}
                        </div>
                        <span class="font-medium">{food.name}</span>
                    </div>

                    <div class="flex items-center gap-3">
                        {#if isSelected}
                            <div class="flex items-center gap-1"
                                 onclick={(e) => e.stopPropagation()}
                                 onpointerdown={(e) => e.stopPropagation()}
                            >

                                <Input
                                        type="number"
                                        value={selectedEntry.quantity}
                                        oninput={(e) => updateQuantity(food.id, Number(e.currentTarget.value))}
                                        class="h-8 w-20 text-right"
                                />
                                <span class="text-xs text-muted-foreground">g</span>
                            </div>
                        {/if}

                        <span class="text-xs text-muted-foreground min-w-[60px] text-right">
                    {isSelected
                        ? Math.round((food.calories * selectedEntry.quantity)/100)
                        : food.calories} kcal/100gr
                </span>
                    </div>
                </CommandItem>
            {/each}
        </CommandGroup>
    </CommandList>

    <div class="border-t p-2 text-xs text-muted-foreground">
        {selectedItems.length} aliment(s) sélectionné(s)
    </div>
</Command>