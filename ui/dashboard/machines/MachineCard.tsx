import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { MachineObj } from "@/src/services/machines/queries";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface MachineCardProps {
  machine: MachineObj;
}

export default function MachineCard(props: MachineCardProps) {
  const { machine } = props;
  const { push } = useRouter();

  const handleOpenMachineDetails = (id: number) => {
    push(`/dashboard/machines/${id}`);
  };

  return (
    <Card key={machine.id.toString()} className="animate-slide-up">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>{machine.name}</CardTitle>
        <div className="flex flex-row gap-2 items-center">
          <Badge variant={machine.status ? "success" : "destructive"} className="h-fit">
            {machine.status ? "Ativa" : "Inativa"}
          </Badge>
          <Button
            onClick={() => handleOpenMachineDetails(machine.id)}
            size="icon"
            variant="ghost"
            className="h-6 w-6"
          >
            <EyeIcon className="h-5 w-5" />
          </Button>
        </div>
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
    </Card>
  );
}
