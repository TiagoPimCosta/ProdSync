import { LineObj } from "@/src/services/lines/queries";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Activity, PowerOff, Settings2 } from "lucide-react";
import Link from "next/link";

interface LineConnectedMachinesProps {
  line?: LineObj;
}

const LineConnectedMachines = ({ line }: LineConnectedMachinesProps) => {
  if (!line) return <div>line Not Found</div>;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {line.machines.map((machine) => (
          <Card key={machine.id.toString()} className="animate-slide-up">
            <CardHeader className="flex-row justify-between items-center">
              <CardTitle>{machine.name}</CardTitle>
              {machine.status ? (
                <span className="flex flex-row gap-2 ml-2 text-sm font-medium text-green-600 items-center justify-center">
                  <Activity className="h-4 w-4 text-green-600" />
                  Ativa
                </span>
              ) : (
                <span className="flex flex-row gap-2 ml-2 text-sm font-medium text-red-600">
                  <PowerOff className="h-4 w-4 text-red-600" />
                  Desativada
                </span>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cadência:</span>
                <span>{machine?.cadence ? `${machine?.cadence} (pçs/hora)` : "N/A"} </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="flex-1">
                <Link
                  className="flex gap-2 items-center"
                  href={`/dashboard/machines/${machine.id}`}
                >
                  <Settings2 className="h-4 w-4" />
                  Detalhes
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default LineConnectedMachines;
