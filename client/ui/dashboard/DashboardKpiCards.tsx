"use client";

import { Activity, BarChart3, Cpu, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useGetDashboardKpis } from "@/src/services/records/queries";

function formatChange(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? "+100% from yesterday" : "No data yet";
  const pct = ((current - previous) / previous) * 100;
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}% from yesterday`;
}

function formatMonthChange(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? "+100% from last month" : "No data yet";
  const pct = ((current - previous) / previous) * 100;
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}% from last month`;
}

const KpiCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-4 rounded" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-20 mb-1" />
      <Skeleton className="h-3 w-40" />
    </CardContent>
  </Card>
);

const DashboardKpiCards = () => {
  const { data: kpis, isLoading } = useGetDashboardKpis();

  if (isLoading) {
    return (
      <>
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Production</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis?.todayRecords ?? 0}</div>
          <p className="text-xs text-muted-foreground">
            {formatChange(kpis?.todayRecords ?? 0, kpis?.yesterdayRecords ?? 0)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Production</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis?.monthRecords ?? 0}</div>
          <p className="text-xs text-muted-foreground">
            {formatMonthChange(kpis?.monthRecords ?? 0, kpis?.lastMonthRecords ?? 0)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis?.activeUsers ?? 0}</div>
          <p className="text-xs text-muted-foreground">Currently active employees</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Machines</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpis?.activeMachines ?? 0}</div>
          <p className="text-xs text-muted-foreground">Currently active machines</p>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardKpiCards;
