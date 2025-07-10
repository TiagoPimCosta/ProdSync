import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import dayjs from "dayjs";
import { MachineObj } from "@/src/services/machines/queries";

interface MachineOverviewProps {
  machine?: MachineObj;
}

const MachineOverview = ({ machine }: MachineOverviewProps) => {
  if (!machine) return <div>line Not Found</div>;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">
              <span>{machine.name}</span>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" className="h-6 gap-1" asChild>
                <Link href={`/dashboard/machines/${machine?.id}/edit`}>
                  <Pencil className="w-4 h-4" /> Editar
                </Link>
              </Button>
              <Badge variant={machine.status ? "success" : "destructive"}>
                {machine.status ? "Ativa" : "Inativa"}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
export default MachineOverview;
