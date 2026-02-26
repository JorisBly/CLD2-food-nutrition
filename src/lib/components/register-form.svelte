<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import {
        FieldGroup,
        Field,
        FieldLabel,
    } from "$lib/components/ui/field/index.js";
    const id = $props.id();
</script>
<Card class="mx-auto w-full max-w-sm">
    <CardHeader>
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>Enter your email below to register a new account</CardDescription>
    </CardHeader>
    <CardContent>
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
    </CardContent>
</Card>