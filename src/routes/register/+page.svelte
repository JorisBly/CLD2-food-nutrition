<script lang="ts">
    import RegisterForm from "@/components/form/register-form.svelte";
    import type { PageData } from "../../../../.svelte-kit/types/src/routes";
    let { data }: { data: PageData } = $props();

</script>
<div class="flex h-screen w-full items-center justify-center px-4">
    <RegisterForm {data} />
</div>