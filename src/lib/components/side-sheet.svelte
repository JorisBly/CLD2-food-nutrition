<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let {textButton, children, title} = $props()

</script>

<Sheet.Root>
    <Sheet.Trigger class={buttonVariants({ variant: "outline" })}
    >{textButton}</Sheet.Trigger
    >
    <Sheet.Content side="right">
        <Sheet.Header>
            <Sheet.Title>{title}</Sheet.Title>
<!--            <Sheet.Description>-->
<!--                Make changes to your profile here. Click save when you're done.-->
<!--            </Sheet.Description>-->
        </Sheet.Header>
        {@render children?.()}
    </Sheet.Content>
</Sheet.Root>