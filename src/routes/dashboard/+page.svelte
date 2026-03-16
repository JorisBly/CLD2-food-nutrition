<script lang="ts">
    import ChartAreaInteractive from "@/components/chart/chart-area-interactive.svelte";

    let {data} = $props()

</script>

{#each data.charts as chart }
    <ChartAreaInteractive chartData={chart.chartData} chartConfig={chart.chartConfig} />
{/each}
