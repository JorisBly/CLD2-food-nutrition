<script lang="ts">
	import './layout.css';
	import favicon from '@/assets/favicon.svg';
    import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
    import AppSidebar from "@/components/sidebar/app-sidebar.svelte";
    import SiteHeader from "@/components/form/site-header.svelte";
    import ChartAreaInteractiveCurve from "@/components/chart/chart-area-interactive-curve.svelte";
    import {page} from "$app/state";

	let { children } = $props();

    const authRoutes = ['/login', '/register'];

    let isAuthPage = $derived(authRoutes.includes(page.url.pathname));

</script>
{#if isAuthPage}
    <main class="flex min-h-screen items-center justify-center">
        {@render children()}
    </main>
{:else}
    <SidebarProvider
            style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
    >
        <AppSidebar variant="inset" />
        <SidebarInset>
            <SiteHeader />
            <div class="flex flex-1 flex-col">
                <div class="@container/main flex flex-1 flex-col gap-2">
                    <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <div class="px-4 lg:px-6">
                            {@render children()}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>
    </SidebarProvider>
{/if}


