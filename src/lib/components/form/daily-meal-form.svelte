<script lang="ts">
    import { Button } from "@/components/ui/button";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {FormControl, FormLabel, Field} from "@/components/ui/form";
    import {
        FieldGroup,
    } from "@/components/ui/field";
    import SearchInputResults from "../input/search-input-results.svelte";

    import FormSelect from "./form-select.svelte";
    import {superForm, type SuperValidated, type Infer,} from "sveltekit-superforms";
    import {zod4Client} from "sveltekit-superforms/adapters";
    import {dailyMealSchema, type FormSchema} from "../../../routes/meal/diary/schema.ts";
    import {type FormSchema as FoodFormSchema} from "../../../routes/meal/food-items/schema.ts";
    import type {FoodItem} from "@/types.ts";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> , userId: string, foods: FoodItem[], foodForm:  SuperValidated<Infer<FoodFormSchema>>} } =
        $props();

    const form = superForm(data.form, {
        validators: zod4Client(dailyMealSchema),
        dataType: 'json'
    });

    const { form: formData, enhance } = form;

    $effect(() => {
        if (data.userId) {
            $formData.userId = data.userId;
        }
    });


</script>

<Card class="mx-auto w-full max-w-sm border-0">
    <CardHeader>
        <CardDescription>Entrez un repas</CardDescription>
    </CardHeader>
    <CardContent>
        <form method="POST" action="/meal/diary?/newEntry"  use:enhance>
            <FieldGroup>
                <Field class="hidden" {form} name="userId">
                    <FormControl>
                        {#snippet children({ props })}
                            <Input type="hidden" {...props} bind:value={$formData.userId} />
                        {/snippet}
                    </FormControl>
                </Field>

                <Field  {form} name="mealType">
                    <FormControl>
                        {#snippet children({ props })}
                            <FormLabel>Type de repas</FormLabel>
                            <FormSelect {...props} bind:value={$formData.mealType}
                                        choices={[
                                           { value: 'breakfast', label: 'Déjeuner'},
                                           { value: 'lunch', label: 'Diner'},
                                           { value:'dinner', label: 'Souper'},
                                           { value: 'snack', label: 'Encas'},
                                           ]}/>
                        {/snippet}

                    </FormControl>
                </Field>
                <Field {form} name="foodItems">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Aliments</FormLabel>
                           <SearchInputResults foodForm={data.foodForm} {...props} bind:selectedItems={$formData.foodItems} foods={data.foods}/>
                        {/snippet}
                    </FormControl>
                </Field>
                <Button type="submit" class="w-full">Crée</Button>
            </FieldGroup>
        </form>

    </CardContent>
</Card>