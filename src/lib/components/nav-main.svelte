<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import type { Icon } from "$lib/icons";
    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";
    let { items }: { items: { title: string; url: string; icon?: Icon }[] } = $props();
</script>
<Sidebar.Group>
    <Sidebar.GroupContent class="flex flex-col gap-2">
        <Sidebar.Menu>
            <Sidebar.MenuItem class="flex items-center gap-2">
            </Sidebar.MenuItem>
        </Sidebar.Menu>
        <Sidebar.Menu>
            {#each items as item (item.title)}
                <Sidebar.MenuItem>
                    <Sidebar.MenuButton tooltipContent={item.title}>
                        {#snippet child({ props })}
                            <a href={item.url} {...props}>
                                <item.icon />
                                <span>{item.title}</span>
                            </a>
                        {/snippet}
                    </Sidebar.MenuButton>
                </Sidebar.MenuItem>
            {/each}
        </Sidebar.Menu>
    </Sidebar.GroupContent>
</Sidebar.Group>