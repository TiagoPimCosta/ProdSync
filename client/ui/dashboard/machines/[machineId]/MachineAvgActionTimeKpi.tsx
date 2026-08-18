"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useGetAvgActionTime } from "@/src/services/records/queries";
import { Timer } from "lucide-react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

interface MachineAvgActionTimeKpiProps {
  machineId: string;
}

function formatDuration(seconds: number | null): string {
  if (seconds === null) return "-";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function MachineAvgActionTimeKpi({ machineId }: MachineAvgActionTimeKpiProps) {
  const searchParams = useSearchParams();

  const userId = searchParams.get("user") || undefined;
  const startDate =
    searchParams.get("startDate") ||
    dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const endDate =
    searchParams.get("endDate") ||
    dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

  const { data, isLoading } = useGetAvgActionTime({ machineId, userId, startDate, endDate });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 mb-1" />
          <Skeleton className="h-3 w-36" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tempo médio por ação</CardTitle>
        <Timer className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatDuration(data?.avgSeconds ?? null)}</div>
        <p className="text-xs text-muted-foreground">Média entre registos consecutivos</p>
      </CardContent>
    </Card>
  );
}
