<script lang="ts">
    import { Button } from "@/components/ui/button";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {FormControl, FormLabel, Field} from "@/components/ui/form";
    import {
        FieldGroup,
    } from "@/components/ui/field";
    import {superForm, type SuperValidated, type Infer,} from "sveltekit-superforms";
    import {zod4Client} from "sveltekit-superforms/adapters";
    import {goalSchema, type FormSchema} from "../../../routes/goal/schema.ts";
    import DatePicker from "$lib/components/input/date-picker.svelte";
    let { data }: { data: { form: SuperValidated<Infer<FormSchema>>, userId: string } } =
        $props();

    const form = superForm(data.form, {
        validators: zod4Client(goalSchema),
    });

    const { form: formData, enhance } = form;

    $effect(() => {
        if (data.userId) {
            $formData.userId = data.userId;
        }
    });
</script>

<Card class="mx-auto w-full max-w-sm">
    <CardHeader>
        <CardTitle class="text-2xl"></CardTitle>
        <CardDescription>Objectifs quotidien </CardDescription>
    </CardHeader>
    <CardContent>
        <form method="POST" action="/goal?/newEntry"  use:enhance>
            <FieldGroup>
                    <Field class="hidden" {form} name="userId">
                        <FormControl>
                            {#snippet children({ props })}
                                <Input type="hidden" {...props} bind:value={$formData.userId} />
                            {/snippet}
                        </FormControl>
                    </Field>
                <Field {form} name="startDate">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Date de début</FormLabel>
                            <Input type="date" step="1" {...props} bind:value={$formData.startDate} />


                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="dailyCalories">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Calories</FormLabel>
                            <Input type="number" step="1" {...props} bind:value={$formData.dailyCalories} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="targetProteins">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Proteines</FormLabel>
                            <Input type="number" step="1" {...props} bind:value={$formData.targetProteins} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="targetCarbs">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Fibres</FormLabel>
                            <Input type="number" step="1" {...props} bind:value={$formData.targetCarbs} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="targetFats">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Graisses</FormLabel>
                            <Input type="number" step="1" {...props} bind:value={$formData.targetFats} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Button type="submit" class="w-full">Change</Button>
            </FieldGroup>
        </form>
    </CardContent>
</Card>