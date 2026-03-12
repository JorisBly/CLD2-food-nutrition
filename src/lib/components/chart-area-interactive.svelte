<script lang="ts">
    import * as Chart from "$lib/components/ui/chart/index.ts";
    import * as Card from "$lib/components/ui/card/index.ts";
    import * as Select from "$lib/components/ui/select/index.ts";
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.ts";
    import {scaleUtc} from "d3-scale";
    import { Area, AreaChart } from "layerchart";
    import { curveNatural } from "d3-shape";
    const chartData = [
        { date: new Date("2024-04-01"), weight: 222},
        { date: new Date("2024-04-02"), weight: 97 },
        { date: new Date("2024-04-03"), weight: 167},
        { date: new Date("2024-04-04"), weight: 242},
        { date: new Date("2024-04-05"), weight: 373},
        { date: new Date("2024-04-06"), weight: 301},
        { date: new Date("2024-04-07"), weight: 245},
        { date: new Date("2024-04-08"), weight: 409},
        { date: new Date("2024-04-09"), weight: 59},
        { date: new Date("2024-04-10"), weight: 261},
        { date: new Date("2024-04-11"), weight: 327},
        { date: new Date("2024-04-12"), weight: 292 },
        { date: new Date("2024-04-13"), weight: 342},
        { date: new Date("2024-04-14"), weight: 137},
        { date: new Date("2024-04-15"), weight: 120},
        { date: new Date("2024-04-16"), weight: 138},
        { date: new Date("2024-04-17"), weight: 446},
        { date: new Date("2024-04-18"), weight: 364},
        { date: new Date("2024-04-19"), weight: 243},
        { date: new Date("2024-04-20"), weight: 89},
        { date: new Date("2024-04-21"), weight: 137},
        { date: new Date("2024-04-22"), weight: 224},
        { date: new Date("2024-04-23"), weight: 138},
    ];
    let timeRange = $state("90d");
    const selectedLabel = $derived.by(() => {
        switch (timeRange) {
            case "90d":
                return "Last 3 months";
            case "30d":
                return "Last 30 days";
            case "7d":
                return "Last 7 days";
            default:
                return "Last 3 months";
        }
    });
    const filteredData = $derived(
        chartData.filter((item) => {
            // eslint-disable-next-line svelte/prefer-svelte-reactivity
            const referenceDate = new Date("2024-06-30");
            let daysToSubtract = 90;
            if (timeRange === "30d") {
                daysToSubtract = 30;
            } else if (timeRange === "7d") {
                daysToSubtract = 7;
            }
            referenceDate.setDate(referenceDate.getDate() - daysToSubtract);
            return item.date >= referenceDate;
        })
    );
    const chartConfig = {
        weight: { label: "Weight", color: "var(--primary)" },
        } satisfies Chart.ChartConfig;
</script>
<Card.Root class="@container/card">
    <Card.Header>
        <Card.Title>Weights</Card.Title>
        <Card.Description>
            <span class="hidden @[540px]/card:block"> Total for the last 3 months </span>
            <span class="@[540px]/card:hidden">Last 3 months</span>
        </Card.Description>
        <Card.Action>
            <ToggleGroup.Root
                    type="single"
                    bind:value={timeRange}
                    variant="outline"
                    class="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
                <ToggleGroup.Item value="90d">Last 3 months</ToggleGroup.Item>
                <ToggleGroup.Item value="30d">Last 30 days</ToggleGroup.Item>
                <ToggleGroup.Item value="7d">Last 7 days</ToggleGroup.Item>
            </ToggleGroup.Root>
            <Select.Root type="single" bind:value={timeRange}>
                <Select.Trigger
                        size="sm"
                        class="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                        aria-label="Select a value"
                >
          <span data-slot="select-value">
            {selectedLabel}
          </span>
                </Select.Trigger>
                <Select.Content class="rounded-xl">
                    <Select.Item value="90d" class="rounded-lg">Last 3 months</Select.Item>
                    <Select.Item value="30d" class="rounded-lg">Last 30 days</Select.Item>
                    <Select.Item value="7d" class="rounded-lg">Last 7 days</Select.Item>
                </Select.Content>
            </Select.Root>
        </Card.Action>
    </Card.Header>
    <Card.Content class="px-2 pt-4 sm:px-6 sm:pt-6">
        <Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
            <AreaChart
                    legend
                    data={filteredData}
                    x="date"
                    xScale={scaleUtc()}
                    series={[
          {
            key: "weight",
            label: "Weight",
            color: chartConfig.weight.color,
          },
        ]}
                    seriesLayout="stack"
                    props={{
          area: {
            curve: curveNatural,
            "fill-opacity": 0.4,
            line: { class: "stroke-1" },
            motion: "tween",
          },
          xAxis: {
            ticks: timeRange === "7d" ? 7 : undefined,
            format: (v) => {
              return v.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            },
          },
          yAxis: { format: () => "" },
        }}
            >
                {#snippet marks({ series, getAreaProps })}
                    <defs>
                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                    offset="5%"
                                    stop-color="var(--color-weight)"
                                    stop-opacity={1.0}
                            />
                            <stop
                                    offset="95%"
                                    stop-color="var(--color-weight)"
                                    stop-opacity={0.1}
                            />
                        </linearGradient>
                        <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stop-color="var(--color-mobile)" stop-opacity={0.8} />
                            <stop
                                    offset="95%"
                                    stop-color="var(--color-mobile)"
                                    stop-opacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    {#each series as s, i (s.key)}
                        <Area
                                {...getAreaProps(s, i)}
                                fill={s.key === "weight" ? "url(#fillDesktop)" : "url(#fillMobile)"}
                        />
                    {/each}
                {/snippet}
                {#snippet tooltip()}
                    <Chart.Tooltip
                            labelFormatter={(v: Date) => {
              return v.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
                            indicator="line"
                    />
                {/snippet}
            </AreaChart>
        </Chart.Container>
    </Card.Content>
</Card.Root>