<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
    import FoodForm from "../form/food-form.svelte";

    let {foodForm} = $props()

</script>

<Dialog.Root>
    <form>
        <Dialog.Trigger
                type="button"
                class={buttonVariants({ variant: "outline" })}
        >
            <ArrowUpRightIcon />
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
            <Dialog.Header>
                <Dialog.Title>Crée un nouvel aliment</Dialog.Title>
                <Dialog.Description>
                    Les informations sont pour 1 gramme de l'éléments crée
                </Dialog.Description>
            </Dialog.Header>

            <FoodForm {foodForm} />
        </Dialog.Content>
    </form>
</Dialog.Root>