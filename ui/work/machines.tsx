"use client";

import React, { useRef } from "react";
import { LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { logout } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import { useGetUserMachines } from "@/src/services/machines/queries";
import ClockBadge from "./ClockBadge";
import RegisterAction from "./RegisterAction";
import { useGetRecords } from "@/src/services/records/queries";
import { greetingsMessage } from "@/src/lib/utils";
import RecordTimeline from "./RecordTimeline";
import { UserStatusResponse } from "@/src/services/auth/queries";

interface MachinesProps {
  user: UserStatusResponse | null;
}
const Machines = (props: MachinesProps) => {
  const { user } = props;
  const router = useRouter();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { data: records } = useGetRecords({
    page: 0,
    size: 10,
    user: user?.id.toString(),
  });

  if (!user) return "NULL";

  let { data: machines } = useGetUserMachines({ id: user?.id.toString() });

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  if (!machines || machines.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-5xl px-4 py-6 sm:py-8 mx-auto">
          <header className="flex flex-col mb-8 sm:text-left animate-fade-in sm:gap-0 gap-2">
            <div className="flex items-center justify-between">
              <ClockBadge />
              <Button variant="ghost" className="gap-2" onClick={handleLogOut}>
                <LogOut />
                LogOut
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              {greetingsMessage(user.name)}
            </h1>
          </header>
          <Card className="rounded-xl border border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>No Machines Available</CardTitle>
              <CardDescription>You don't have any machines assigned to you.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl px-4 py-6 sm:py-8 mx-auto">
        <header className="flex flex-col mb-8 sm:text-left animate-fade-in sm:gap-0 gap-2">
          <div className="flex items-center justify-between">
            <ClockBadge />
            <Button variant="ghost" className="gap-2" onClick={handleLogOut}>
              <LogOut />
              LogOut
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{greetingsMessage(user.name)}</h1>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RegisterAction machines={machines} />
          <div>
            <Card className="rounded-xl border border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-medium">Activity Log</CardTitle>
                </div>
                <CardDescription>Recent action history</CardDescription>
              </CardHeader>
              <CardContent>
                <RecordTimeline ref={timelineRef} records={records?.items} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
