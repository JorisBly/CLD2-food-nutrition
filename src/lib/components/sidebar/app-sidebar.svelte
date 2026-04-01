<script lang="ts">
    import DashboardIcon from "@/icons/dashboard.svelte";
    import * as Sidebar from "@/components/ui/sidebar";
    import NavMain from "./nav-main.svelte";
    import type { ComponentProps } from "svelte";
    import WeightIcon from "@/icons/weight.svelte";
    import MealIcon from "@/icons/meal.svelte";
    import FoodItemIcon from "@/icons/food-item.svelte";
    import DiaryIcon from "@/icons/diary.svelte";
    import {GoalIcon} from "@lucide/svelte";

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
                title: "Poids",
                url: "/weight",
                icon: WeightIcon,
            },
            {
                title: "Repas",
                icon : MealIcon,
                items: [
                    {
                        title: "Journal",
                        url: "/meal/diary",
                        icon: DiaryIcon,
                    },
                    {
                        title: "Aliments",
                        url: "/meal/food-items",
                        icon: FoodItemIcon,
                    },
                ],
            },
            {
                title: "Objectifs",
                icon: GoalIcon,
                url: "/goal",
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
                        <a href="/dashboard" {...props}>
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