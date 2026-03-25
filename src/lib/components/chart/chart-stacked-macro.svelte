<script lang="ts">
    import * as Chart from "@/components/ui/chart";
    import * as Card from "@/components/ui/card";
    import * as Select from "@/components/ui/select";
    import * as ToggleGroup from "@/components/ui/toggle-group";
    import {scaleBand} from "d3-scale";
    import { BarChart} from "layerchart";


    const {chartData, chartConfig, nutritionGoals = []} = $props()
    let timeRange = $state("90d");
    const selectedLabel = $derived.by(() => {
        switch (timeRange) {
            case "90d":
                return "90 denier jours";
            case "30d":
                return "30 dernier jours";
            case "7d":
                return "7 dernier jours";
            default:
                return "90 dernier jours";
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


    const dataWithGoals = $derived(
        filteredData.map((item) => {
            const activeGoal = nutritionGoals.find((goal) => {
                const itemDate = new Date(item.date);
                const start = new Date(goal.startDate);
                const end = goal.endDate ? new Date(goal.endDate) : new Date("2099-01-01");
                return itemDate >= start && itemDate <= end;
            });

            return {
                ...item,
                goalValue: activeGoal ? activeGoal.calories : 2000
            };
        })
    );
</script>
<Card.Root class="@container/card">
    <Card.Header>
        <Card.Title>Macros</Card.Title>
        <Card.Action>
            <ToggleGroup.Root
                    type="single"
                    bind:value={timeRange}
                    variant="outline"
                    class="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
            >
                <ToggleGroup.Item value="7d">7 derniers jours</ToggleGroup.Item>
                <ToggleGroup.Item value="30d">30 dernier jours</ToggleGroup.Item>
                <ToggleGroup.Item value="90d">90 derniers jours</ToggleGroup.Item>
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
                    <ToggleGroup.Item value="7d" class="rounded-lg">7 derniers jours</ToggleGroup.Item>
                    <ToggleGroup.Item value="30d" class="rounded-lg">30 dernier jours</ToggleGroup.Item>
                    <ToggleGroup.Item value="90d" class="rounded-lg">90 derniers jours</ToggleGroup.Item>
                </Select.Content>
            </Select.Root>
        </Card.Action>
    </Card.Header>
    <Card.Content class="px-2 pt-4 sm:px-6 sm:pt-6">
        <Chart.Container config={chartConfig} class="aspect-auto h-[250px] w-full">
            <BarChart
                    legend
                    data={filteredData}
                    seriesLayout="stack"
                    x="date"
                    xScale={scaleBand().padding(0.25)}
                    props={{
                 bars: {
                        "stroke-width": 0,
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
                    series={[
                        {
                            key: "calories",
                            label: "Calories",
                            color: chartConfig.calories.color
                        },
          {
            key: "proteins",
            label: "Proteines",
            color: chartConfig.proteins.color,
          },
          {
            key: "carbs",
            label: "Fibres",
            color: chartConfig.carbs.color,
          },
          {
            key: "fats",
            label: "Graisses",
            color: chartConfig.fats.color,
          },
        ]}>
            </BarChart>

        </Chart.Container>
    </Card.Content>
</Card.Root>