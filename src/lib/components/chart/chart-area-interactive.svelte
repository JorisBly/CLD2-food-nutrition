<script lang="ts">
    import * as Chart from "@/components/ui/chart";
    import * as Card from "@/components/ui/card";
    import * as Select from "@/components/ui/select";
    import * as ToggleGroup from "@/components/ui/toggle-group";
    import {scaleUtc} from "d3-scale";
    import { Area, AreaChart } from "layerchart";
    import { curveNatural } from "d3-shape";
    const {chartData, chartConfig} = $props()
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
            const referenceDate = new Date();
            let daysToSubtract = 90;
            if (timeRange === "30d") {
                daysToSubtract = 30;
            } else if (timeRange === "7d") {
                daysToSubtract = 7;
            }
            referenceDate.setDate(referenceDate.getDate() - daysToSubtract);

            const itemDate = new Date(item.date)
            return itemDate >= referenceDate;
        })
            .map((item) => {
                const itemDate = new Date(item.date);
                return {
                    ...item,
                    date: itemDate,
                }
            })
    );

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