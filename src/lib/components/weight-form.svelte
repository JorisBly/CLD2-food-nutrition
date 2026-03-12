<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import {FormControl, FormLabel, Field} from "@/components/ui/form";
    import {
        FieldGroup,
    } from "$lib/components/ui/field/index.js";
    import {weightSchema, type FormSchema} from "../../routes/weight/schema";
    import {superForm, type SuperValidated, type Infer,} from "sveltekit-superforms";
    import {zod4Client} from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> , userId: string} } =
        $props();

    const form = superForm(data.form, {
        validators: zod4Client(weightSchema),
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
        <CardDescription>Enter your weight</CardDescription>
    </CardHeader>
    <CardContent>
        <form method="POST" action="/weight?/newEntry"  use:enhance>
            <FieldGroup>
                <Field class="hidden" {form} name="userId">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Weight</FormLabel>
                            <Input type="hidden" {...props} bind:value={$formData.userId} />

                        {/snippet}
                    </FormControl>
                </Field>
                <Field {form} name="weight">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Weight</FormLabel>
                            <Input type="number" step="0.01" {...props} bind:value={$formData.weight} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="date">
                    <FormControl>
                        {#snippet children({ props })}
                            <FormLabel>Date</FormLabel>
                            <Input type="date" {...props} bind:value={$formData.date} />
                        {/snippet}
                    </FormControl>
                </Field>
                <Button type="submit" class="w-full">Create</Button>
            </FieldGroup>
        </form>

    </CardContent>
</Card>