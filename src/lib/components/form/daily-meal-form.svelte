<script lang="ts">
    import { Button } from "@/components/ui/button";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {FormControl, FormLabel, Field} from "@/components/ui/form";
    import {
        FieldGroup,
    } from "@/components/ui/field";

    import FormSelect from "./form-select.svelte";
    import {superForm, type SuperValidated, type Infer,} from "sveltekit-superforms";
    import {zod4Client} from "sveltekit-superforms/adapters";
    import {dailyMealSchema, type FormSchema} from "../../../routes/meal/diary/schema.ts";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> , userId: string} } =
        $props();

    const form = superForm(data.form, {
        validators: zod4Client(dailyMealSchema),
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
        <CardDescription>Enter your meal</CardDescription>
    </CardHeader>
    <CardContent>
        <form method="POST" action="/meal?/newEntry"  use:enhance>
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
                            <FormLabel>Meal type</FormLabel>
                            <FormSelect bind:value={$formData.mealType}
                                        choices={[
                                           { value: 'breakfast', label: 'Breakfast'},
                                           {value: 'lunch', label: 'Lunch'},
                                           { value:'dinner', label: 'Dinner'},
                                           {value: 'snack', label: 'Snack'},]}/>
                        {/snippet}
                    </FormControl>
                </Field>
                <Field class="hidden" {form} name="foodId">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Food</FormLabel>
                            <Input type="number" step="0.01" {...props} bind:value={$formData.foodId} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Button type="submit" class="w-full">Create</Button>
            </FieldGroup>
        </form>

    </CardContent>
</Card>