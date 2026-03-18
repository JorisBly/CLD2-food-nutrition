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

    let  { foodForm }  = $props();

    const form = superForm(foodForm, {
        validators: zod4Client(foodSchema),
        onUpdate({ form }) {
            if (!form.valid) {
                console.log("Erreurs de validation :", form.errors);
            }
        }
    });

    const { form: formData, enhance } = form;

</script>

<Card class="mx-auto w-full max-w-sm border-0">
    <CardContent>
        <form method="POST" enctype="multipart/form-data" action="/meal/food-items?/newEntry"  use:enhance>
            <FieldGroup>

                <Field {form} name="name">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Name</FormLabel>
                            <Input type="text" step="0.1" {...props} bind:value={$formData.name} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="proteins">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Proteins</FormLabel>
                            <Input type="number" step="0.1" {...props} bind:value={$formData.proteins} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="carbs">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Carbs</FormLabel>
                            <Input type="number" step="0.1" {...props} bind:value={$formData.carbs} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="fats">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Fats</FormLabel>
                            <Input type="number" step="0.1" {...props} bind:value={$formData.fats} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="img">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Image</FormLabel>
                            <Input type="file" {...props} bind:value={$formData.img} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Button type="submit" class="w-full">Create</Button>
            </FieldGroup>
        </form>

    </CardContent>
</Card>