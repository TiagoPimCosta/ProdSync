"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";
import MultiDayLineChart from "@/src/components/ui/Charts/MultiDayLineChart";
import DailyLineChart from "@/src/components/ui/Charts/DailyLineChart";

export default function LinePerformanceChart() {
  const linePerformanceSearchParams = useSearchParams();

  const user = linePerformanceSearchParams.get("user") || undefined;
  const machine = linePerformanceSearchParams.get("machine") || undefined;
  const startPeriod = linePerformanceSearchParams.get("startDate") || undefined;
  const endPeriod = linePerformanceSearchParams.get("endDate") || undefined;

  return (
    <Card className="animate-slide-up">
      <CardContent className="pt-8">
        {startPeriod === endPeriod ? (
          <DailyLineChart
            userId={user}
            machineId={machine}
            startDate={startPeriod}
            endDate={endPeriod}
            showAverage
          />
        ) : (
          <MultiDayLineChart
            userId={user}
            machineId={machine}
            startDate={startPeriod}
            endDate={endPeriod}
            showAverage
          />
        )}
      </CardContent>
    </Card>
  );
}
