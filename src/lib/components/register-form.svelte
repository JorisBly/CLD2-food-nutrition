<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import {
        FieldGroup,
        Field,
        FieldLabel,
        FieldDescription,
    } from "$lib/components/ui/field/index.js";
    const id = $props.id();
</script>
<Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
        <Card.Title class="text-2xl">Register</Card.Title>
        <Card.Description>Enter your email below to register a new account</Card.Description>
    </Card.Header>
    <Card.Content>
        <form>
            <FieldGroup>
                <Field>
                    <FieldLabel for="email-{id}">Email</FieldLabel>
                    <Input id="email-{id}" type="email" placeholder="m@example.com" required />
                </Field>
                <Field>
                    <div class="flex items-center">
                        <FieldLabel for="password-{id}">Password</FieldLabel>
                    </div>
                    <Input id="password-{id}" type="password" required />
                </Field>
                <Field>
                    <Button type="submit" class="w-full">Register</Button>
                </Field>
            </FieldGroup>
        </form>
    </Card.Content>
</Card.Root>