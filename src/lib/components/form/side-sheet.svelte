<script lang="ts">
    import { Button } from "@/components/ui/button";
    import * as Sheet from "@/components/ui/sheet";
    import { buttonVariants } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";

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