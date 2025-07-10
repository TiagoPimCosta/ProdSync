"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/src/components/ui/card";
import MultiDayLineChart from "@/src/components/ui/Charts/MultiDayLineChart";
import DailyLineChart from "@/src/components/ui/Charts/DailyLineChart";

export default function MachinePerformanceChart() {
  const params = useParams();
  const machineId = params.machineId;
  const machinePerformanceSearchParams = useSearchParams();

  const user = machinePerformanceSearchParams.get("user") || undefined;
  const startPeriod = machinePerformanceSearchParams.get("startDate") || undefined;
  const endPeriod = machinePerformanceSearchParams.get("endDate") || undefined;

  return (
    <Card className="animate-slide-up">
      <CardContent className="pt-8">
        {startPeriod === endPeriod ? (
          <DailyLineChart
            userId={user}
            machineId={machineId as string}
            startDate={startPeriod}
            endDate={endPeriod}
            showAverage
          />
        ) : (
          <MultiDayLineChart
            userId={user}
            machineId={machineId as string}
            startDate={startPeriod}
            endDate={endPeriod}
            showAverage
          />
        )}
      </CardContent>
    </Card>
  );
}
