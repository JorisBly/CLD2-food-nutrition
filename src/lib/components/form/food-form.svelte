<script lang="ts">
    import { Button } from "@/components/ui/button";
    import {Card, CardHeader, CardDescription, CardContent} from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {FormControl, FormLabel, Field} from "@/components/ui/form";
    import {
        FieldGroup,
    } from "@/components/ui/field";

    import {superForm, type SuperValidated, type Infer,} from "sveltekit-superforms";
    import {zod4Client} from "sveltekit-superforms/adapters";
    import {foodSchema, type FormSchema} from "../../../routes/meal/food-items/schema.ts";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>>} } =
        $props();

    const form = superForm(data.form, {
        validators: zod4Client(foodSchema),
    });

    const { form: formData, enhance } = form;



</script>

<Card class="mx-auto w-full max-w-sm border-0">
    <CardHeader>
        <CardDescription>Create food item</CardDescription>
    </CardHeader>
    <CardContent>
        <form method="POST" action="/meal/food-items?/newEntry"  use:enhance>
            <FieldGroup>

                <Field {form} name="name">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Name</FormLabel>
                            <Input type="text" step="0.01" {...props} bind:value={$formData.name} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="proteins">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Proteins</FormLabel>
                            <Input type="number" step="0.01" {...props} bind:value={$formData.proteins} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="carbs">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Carbs</FormLabel>
                            <Input type="number" step="0.01" {...props} bind:value={$formData.carbs} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="fats">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Fats</FormLabel>
                            <Input type="number" step="0.01" {...props} bind:value={$formData.fats} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Button type="submit" class="w-full">Create</Button>
            </FieldGroup>
        </form>

    </CardContent>
</Card>