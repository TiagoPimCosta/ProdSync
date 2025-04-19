import { forwardRef } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Action } from "@/src/hooks/useJobActions";
import dayjs from "dayjs";

interface ActionTimelineProps {
  actions: Action[];
}

const ActionTimeline = forwardRef<HTMLDivElement, ActionTimelineProps>(({ actions }, ref) => {
  if (actions.length === 0) {
    return (
      <div ref={ref} className="mt-6 p-8 text-center text-muted-foreground animate-fade-in">
        <Clock className="mx-auto h-12 w-12 mb-3 opacity-20" />
        <p className="text-lg">No actions registered yet</p>
        <p className="text-sm">Your activity will appear here</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="mt-3 space-y-6 animate-fade-in">
      <div className="space-y-3">
        {actions.map((action) => (
          <div
            key={action.id}
            className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden animate-scale-in"
          >
            <div className="flex items-center p-4">
              <div className={cn("w-2 h-10 rounded-full mr-4", action.jobColor)} />
              <div className="flex-1">
                <p className="font-medium">{action.jobName}</p>
                <p className="text-sm text-muted-foreground">
                  {dayjs(action.timestamp).format("DD/MM/YYYY HH:mm:ss")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

ActionTimeline.displayName = "ActionTimeline";

export default ActionTimeline;
