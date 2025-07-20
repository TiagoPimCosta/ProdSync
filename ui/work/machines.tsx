"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { logout } from "@/src/lib/auth";
import { useRouter } from "next/navigation";
import { useGetUserMachines } from "@/src/services/machines/queries";
import ClockBadge from "./ClockBadge";
import RegisterAction from "./RegisterAction";
import { greetingsMessage } from "@/src/lib/utils";
import { UserStatusResponse } from "@/src/services/auth/queries";

interface MachinesProps {
  user: UserStatusResponse;
}
const Machines = (props: MachinesProps) => {
  const { user } = props;
  const router = useRouter();

  if (!user) return null;

  let { data: machines } = useGetUserMachines({ id: user.id.toString() });

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  const content =
    !machines || machines.length === 0 ? (
      <Card className="rounded-xl border border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Sem máquinas disponíveis</CardTitle>
          <CardDescription>Não tem nenhuma máquina atribuída.</CardDescription>
        </CardHeader>
      </Card>
    ) : (
      <div className="flex flex-row">
        <RegisterAction machines={machines} />
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl px-4 py-6 sm:py-8 mx-auto">
        <header className="flex flex-col mb-8 sm:text-left animate-fade-in sm:gap-0 gap-2">
          <div className="flex items-center justify-between">
            <ClockBadge />
            <Button variant="ghost" className="gap-1" onClick={handleLogOut}>
              <LogOut />
              Terminar sessão
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{greetingsMessage(user.name)}</h1>
        </header>
        {content}
      </div>
    </div>
  );
};

export default Machines;
