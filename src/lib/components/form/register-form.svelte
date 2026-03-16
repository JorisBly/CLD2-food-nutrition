<script lang="ts">
    import { Button } from "@/components/ui/button";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import {FormControl, FormLabel, Field} from "@/components/ui/form";
    import {
        FieldGroup,
    } from "@/components/ui/field";
    import {registerSchema, type FormSchema} from "../../../routes/register/schema.ts";
    import {superForm, type SuperValidated, type Infer,} from "sveltekit-superforms";
    import {zod4Client} from "sveltekit-superforms/adapters";

    let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
        $props();

    const form = superForm(data.form, {
        validators: zod4Client(registerSchema),
    });

    const { form: formData, enhance } = form;
</script>

<Card class="mx-auto w-full max-w-sm">
    <CardHeader>
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>Enter your email and password below to register a new account</CardDescription>
    </CardHeader>
    <CardContent>
        <form method="POST" action="/login?/register"  use:enhance>
            <FieldGroup>
                <Field {form} name="username">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Username</FormLabel>
                            <Input type="text" {...props} bind:value={$formData.username} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="firstname">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>First name</FormLabel>
                            <Input type="text" {...props} bind:value={$formData.firstname} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="lastname">
                    <FormControl>
                        {#snippet children({ props })}

                            <FormLabel>Last name</FormLabel>
                            <Input type="text" {...props} bind:value={$formData.lastname} />

                        {/snippet}
                    </FormControl>
                </Field>

                <Field {form} name="email">
                <FormControl>
                    {#snippet children({ props })}

                        <FormLabel>Email</FormLabel>
                        <Input type="email" {...props} bind:value={$formData.email} />

                    {/snippet}
                </FormControl>
                </Field>

                <Field {form} name="password">
                <FormControl>
                    {#snippet children({ props })}
                        <FormLabel>Password</FormLabel>
                        <Input type="password" {...props} bind:value={$formData.password} />

                    {/snippet}
                </FormControl>
                </Field>

                    <Button type="submit" class="w-full">Register</Button>
            </FieldGroup>
        </form>

    </CardContent>
</Card>