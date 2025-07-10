import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import { ChartConfig, ChartContainer, ChartTooltip } from "../chart";
import { useGetDailyStatsRecords } from "@/src/services/records/queries";

const chartConfig: ChartConfig = {
  count: {
    label: "count",
    color: "hsl(var(--chart-1))",
  },
};

interface MultiDayLineChartProps {
  machineId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  showGoal?: boolean;
  showAverage?: boolean;
  goal?: number;
}

export default function MultiDayLineChart(props: MultiDayLineChartProps) {
  const {
    machineId,
    userId,
    startDate = dayjs().startOf("week"),
    endDate = dayjs().endOf("week"),
    showGoal = false,
    showAverage = false,
    goal = 0,
  } = props;

  const { data = [] } = useGetDailyStatsRecords({
    machineId,
    userId,
    startDate: dayjs(startDate).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
    endDate: dayjs(endDate).endOf("day").format("YYYY-MM-DD HH:mm:ss"),
  });

  const average =
    showAverage && data.length ? data.reduce((sum, d) => sum + d.count, 0) / data.length : 0;

  return (
    <ChartContainer className="w-full h-full" config={chartConfig}>
      <LineChart data={data} margin={{ right: 6 }}>
        <YAxis width={40} domain={["dataMin", "dataMax"]} padding={{ top: 15 }} />
        <XAxis
          dataKey="day"
          height={30}
          tickFormatter={(value) => dayjs(value).format("DD MMM YYYY")}
          dy={5}
        />
        <CartesianGrid vertical={false} />

        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { day, count } = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-muted-foreground">
                      {dayjs(day).format("DD MMM YYYY")}
                    </span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="uppercase text-muted-foreground text-xs">Contagem</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
          labelClassName="text-sm"
        />

        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="var(--color-count)"
          fill="var(--color-count)"
          fillOpacity={0.3}
          strokeWidth={2}
          dot={{ r: 3 }}
        />
        {showGoal && (
          <ReferenceLine
            y={goal}
            stroke="red"
            strokeDasharray="4 4"
            label={{
              value: `Meta: ${goal}`,
              position: "top",
              fill: "red",
              fontSize: 12,
            }}
          />
        )}
        {showAverage && (
          <ReferenceLine
            y={average}
            stroke="green"
            strokeDasharray="4 4"
            label={{
              value: `Média: ${average.toFixed(1)}/dia`,
              position: "top",
              fill: "green",
              fontSize: 12,
            }}
          />
        )}
      </LineChart>
    </ChartContainer>
  );
}
