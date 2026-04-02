<script lang="ts">
    import ChartAreaInteractiveCurve from "@/components/chart/chart-area-interactive-curve.svelte";
    import ChartStackedMacro from "@/components/chart/chart-stacked-macro.svelte";

    let {data} = $props()
</script>

{#each data.charts as chart }
    <ChartAreaInteractiveCurve chartData={chart.weightChartData} chartConfig={chart.weightChartConfig} />
    <ChartStackedMacro chartData={chart.macroChartData} chartConfig={chart.macroChartConfig} />
{/each}
