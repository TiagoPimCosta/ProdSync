import { forwardRef } from "react";
import { Clock } from "lucide-react";
import dayjs from "dayjs";
import { RecordObj } from "@/src/services/records/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export interface Action {
  id: string;
  jobId: string;
  timestamp: Date;
  jobName: string;
  jobColor: string;
}

interface RecordTimelineProps {
  records: RecordObj[] | undefined;
}

const RecordTimeline = forwardRef<HTMLDivElement, RecordTimelineProps>(({ records }, ref) => {
  if (!records || records.length === 0) {
    return (
      <div ref={ref} className="mt-6 p-8 text-center text-muted-foreground animate-fade-in">
        <Clock className="mx-auto h-12 w-12 mb-3 opacity-20" />
        <p className="text-lg">No actions registered yet</p>
        <p className="text-sm">Your activity will appear here</p>
      </div>
    );
  }

  return (
    <Card className="rounded-xl border border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium">Registo de Atividades</CardTitle>
        </div>
        <CardDescription>Histórico recente de ações</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="mt-3 space-y-6 animate-fade-in">
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden animate-scale-in"
              >
                <div className="flex items-center p-4">
                  <div className="flex-1">
                    <p className="font-medium">{record.machine.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dayjs(record.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default RecordTimeline;
