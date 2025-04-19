"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Clock, LogOut, Trash2 } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import JobCard from "./JobCard";
import { toast } from "react-toastify";
import { useJobActions } from "@/src/hooks/useJobActions";
import ActionButton from "./ActionButton";
import ActionTimeline from "./ActionTimeline";
import { Badge } from "@/src/components/ui/badge";
import dayjs from "dayjs";
import { logout } from "@/src/lib/auth";
import { useRouter } from "next/navigation";

const Machines = () => {
  const { jobs, actions, registerAction, clearActions } = useJobActions();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClearAll = () => {
    if (actions.length === 0) {
      toast.success("No actions to clear");
      return;
    }

    clearActions();
  };

  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl px-4 py-6 sm:py-8 mx-auto">
        <header className="flex flex-col mb-8 sm:text-left animate-fade-in sm:gap-0 gap-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="h-fit">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                {dayjs(currentTime).format("DD/MM/YYYY HH:mm:ss")}
              </span>
            </Badge>
            <Button variant="ghost" className="gap-2" onClick={handleLogOut}>
              <LogOut />
              LogOut
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">AS Braga</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Register Action</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <ActionButton
                    key={job.id}
                    jobId={job.id}
                    jobName={job.name}
                    jobColor={job.color}
                    onClick={(id) => {
                      registerAction(id);
                    }}
                  />
                ))}
              </div>
            </section>

            <Separator className="my-6" />

            <section className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Assigned Jobs</h2>
                <Badge variant="secondary" className="h-fit">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">{jobs.length} Jobs</span>
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} id={job.id} name={job.name} color={job.color} />
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Card className="rounded-xl border border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-medium">Activity Log</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-muted-foreground h-8"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
                <CardDescription>Recent action history</CardDescription>
              </CardHeader>
              <CardContent>
                <ActionTimeline ref={timelineRef} actions={actions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;
