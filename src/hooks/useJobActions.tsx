import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export interface Job {
  id: string;
  name: string;
  color: string;
}

export interface Action {
  id: string;
  jobId: string;
  timestamp: Date;
  jobName: string;
  jobColor: string;
}

export function useJobActions() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: "1", name: "Assembly Line A", color: "bg-blue-500" },
    { id: "2", name: "Quality Inspection", color: "bg-purple-500" },
  ]);

  const [actions, setActions] = useState<Action[]>(() => {
    const savedActions = localStorage.getItem("factory-actions");
    return savedActions
      ? JSON.parse(savedActions).map((action: any) => ({
          ...action,
          timestamp: new Date(action.timestamp),
        }))
      : [];
  });

  useEffect(() => {
    // Save actions to localStorage whenever they change
    localStorage.setItem("factory-actions", JSON.stringify(actions));
  }, [actions]);

  const registerAction = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const newAction: Action = {
      id: Date.now().toString(),
      jobId,
      timestamp: new Date(),
      jobName: job.name,
      jobColor: job.color,
    };

    setActions((prev) => [newAction, ...prev]);

    toast.success("Action Registered");
  };

  const clearActions = () => {
    setActions([]);
    toast.success("Actions Cleared");
  };

  return {
    jobs,
    actions,
    registerAction,
    clearActions,
  };
}
