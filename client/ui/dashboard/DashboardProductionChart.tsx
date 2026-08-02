'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Skeleton } from '@/src/components/ui/skeleton';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import DailyLineChart from '@/src/components/ui/Charts/DailyLineChart';
import { useGetLines } from '@/src/services/lines/queries';
import dayjs from 'dayjs';

const DashboardProductionChart = () => {
  const { data: linesData, isLoading } = useGetLines({
    page: 0,
    size: 50,
  });
  const lines = linesData?.items ?? [];
  const today = dayjs().format('DD MMM YYYY');

  if (isLoading) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[280px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!lines.length) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Production per Hour</CardTitle>
          <CardDescription>No active production lines found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader className="flex-row justify-between">
        <CardTitle>Production per Hour</CardTitle>
        <CardDescription>{today}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={String(lines[0].id)}>
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            {lines.map((line) => (
              <TabsTrigger key={line.id} value={String(line.id)}>
                {line.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {lines.map((line) => (
            <TabsContent key={line.id} value={String(line.id)}>
              <div className="h-[280px]">
                <DailyLineChart lineId={String(line.id)} showAverage />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardProductionChart;
