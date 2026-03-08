import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import { ChartConfig, ChartContainer, ChartTooltip } from "../chart";
import { useGetHourlyStatsRecords } from "@/src/services/records/queries";

const chartConfig: ChartConfig = {
  count: {
    label: "count",
    color: "hsl(var(--chart-1))",
  },
};

interface DailyLineChartProps {
  lineId?: string;
  machineId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  showGoal?: boolean;
  showAverage?: boolean;
  goal?: number;
}

const START_HOUR = 7;
const END_HOUR = 18;

export default function DailyLineChart(props: DailyLineChartProps) {
  const {
    machineId,
    lineId,
    userId,
    startDate = dayjs().startOf("day"),
    endDate = dayjs().endOf("day"),
    showGoal = false,
    showAverage = false,
    goal = 0,
  } = props;
  const format = "YYYY-MM-DD HH:mm:ss";

  const { data = [] } = useGetHourlyStatsRecords({
    lineId,
    userId,
    machineId,
    startDate: dayjs(startDate).hour(START_HOUR).startOf("hour").format(format),
    endDate: dayjs(endDate).hour(END_HOUR).endOf("hour").format(format),
  });

  const average =
    showAverage && data.length ? data.reduce((sum, d) => sum + d.count, 0) / data.length : 0;

  return (
    <ChartContainer className="w-full h-full" config={chartConfig}>
      <LineChart data={data} margin={{ right: 10 }}>
        <YAxis width={40} domain={["dataMin", "dataMax"]} padding={{ top: 15 }} />
        <XAxis
          dataKey="hour"
          height={30}
          tickFormatter={(value) => dayjs(value).format("HH:mm")}
          dy={5}
        />
        <CartesianGrid vertical={false} />

        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { hour, count } = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-muted-foreground">
                      {dayjs(hour).format("DD MMM YYYY HH:mm")}
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
              value: `Média: ${average.toFixed(1)}/hora`,
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
