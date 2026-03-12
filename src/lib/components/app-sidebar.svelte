<script lang="ts">
    import DashboardIcon from "$lib/icons/dashboard.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import NavMain from "./nav-main.svelte";
    import type { ComponentProps } from "svelte";
    import WeightIcon from "$lib/icons/weight.svelte";
    import MealIcon from "$lib/icons/meal.svelte";
    import FoodItemIcon from "@/icons/food-item.svelte";

    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: DashboardIcon,
            },
            {
                title: "Weights",
                url: "/weight",
                icon: WeightIcon,
            },
            {
                title: "Meals",
                icon : MealIcon,
                items: [
                    {
                        title: "Food items",
                        url: "/meal/food-items",
                        icon: FoodItemIcon,
                    },
                ],
            }
        ],
    };
    let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>
<Sidebar.Root collapsible="offcanvas" {...restProps}>
    <Sidebar.Header>
        <Sidebar.Menu>
            <Sidebar.MenuItem>
                <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
                    {#snippet child({ props })}
                        <a href="##" {...props}>
                            <span class="text-base font-semibold">Nutritrack</span>
                        </a>
                    {/snippet}
                </Sidebar.MenuButton>
            </Sidebar.MenuItem>
        </Sidebar.Menu>
    </Sidebar.Header>
    <Sidebar.Content>
        <NavMain items={data.navMain} />
    </Sidebar.Content>
</Sidebar.Root>