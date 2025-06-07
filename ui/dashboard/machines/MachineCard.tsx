import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { MachineObj } from "@/src/services/machines/queries";
import { Activity, Clock, PowerOff, Settings2 } from "lucide-react";

interface MachineCardProps {
  machine: MachineObj;
}

export default function MachineCard(props: MachineCardProps) {
  const { machine } = props;

  return (
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
          <span className="text-muted-foreground">Linha:</span>
          <span>{machine?.line?.name || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Funcionário:</span>
          <span>{machine?.user?.name || "N/A"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex  gap-2 items-center">
        <Button variant="outline" size="sm" className="flex-1">
          <Settings2 className="mr-2 h-4 w-4" />
          Maintain
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Clock className="mr-2 h-4 w-4" />
          History
        </Button>
      </CardFooter>
    </Card>
  );
}
