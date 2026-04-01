<script lang="ts" generics="TData, TValue">
    import { type ColumnDef, getCoreRowModel } from "@tanstack/table-core";
    import {
        createSvelteTable,
        FlexRender,
    } from "@/components/ui/data-table";
    import * as Table from "@/components/ui/table";
    import {CldImage} from "svelte-cloudinary";


    type DataTableProps<TData, TValue> = {
        columns: ColumnDef<TData, TValue>[]
        data: TData[]
        action: string
    };

    let { data, columns, action }: DataTableProps<TData, TValue> = $props();


    const table = createSvelteTable({
        get data() {
            return data;
        },
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
</script>

<div class="rounded-md border">
    <Table.Root>
        <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
                <Table.Row>
                    {#each headerGroup.headers as header (header.id)}
                        <Table.Head colspan={header.colSpan}>
                            {#if !header.isPlaceholder}
                                <FlexRender
                                        content={header.column.columnDef.header}
                                        context={header.getContext()}
                                />
                            {/if}
                        </Table.Head>
                    {/each}
                </Table.Row>
            {/each}
        </Table.Header>
        <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
                <Table.Row data-state={row.getIsSelected() && "selected"}>
                    {#each row.getVisibleCells() as cell (cell.id)}
                        <Table.Cell>
                            {#if cell.column.id === 'img'}
                                <CldImage
                                        width="50"
                                        height="50"
                                        src="{cell.getValue()}"
                                        alt="{cell.getValue()}"
                                    />
                                {:else if cell.column.id === 'id'}
                                <form action="{action}" method="POST">
                                    <input type="hidden" name="id" value="{cell.getValue()}" />
                                <button
                                        type="submit"
                                        class="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-muted-foreground"
                                        onclick={() => !confirm('Supprimer cet aliment ?') && event.preventDefault()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                                    </svg>
                                    <span class="sr-only">Supprimer</span>
                                </button>
                                </form>
                                {:else}
                            <FlexRender
                                    content={cell.column.columnDef.cell}
                                    context={cell.getContext()}
                            />
                                {/if}
                        </Table.Cell>
                    {/each}
                </Table.Row>
            {:else}
                <Table.Row>
                    <Table.Cell colspan={columns.length} class="h-24 text-center">
                        No results.
                    </Table.Cell>
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
</div>