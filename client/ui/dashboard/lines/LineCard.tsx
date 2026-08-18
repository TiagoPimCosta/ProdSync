import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import DailyLineChart from "@/src/components/ui/Charts/DailyLineChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { LineObj } from "@/src/services/lines/queries";
import dayjs from "dayjs";
import { EllipsisIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface LineCardProps {
  line: LineObj;
}

export default function LineCard(props: LineCardProps) {
  const { line } = props;
  const { push } = useRouter();

  const handleOpenLineDetails = (id: string) => {
    push(`/dashboard/lines/${id}`);
  };

  return (
    <Card key={line.id.toString()} className="animate-slide-up">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>{line.name}</CardTitle>
        <div className="flex flex-row gap-2 items-center">
          <Badge variant={line.status ? "success" : "destructive"} className="h-fit">
            {line.status ? "Ativa" : "Inativa"}
          </Badge>
          <Button
            onClick={() => handleOpenLineDetails(line.id)}
            size="icon"
            variant="ghost"
            className="h-6 w-6"
          >
            <EyeIcon className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <EllipsisIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => console.log("Desativar/Ativar")}
                className="flex items-center gap-2"
              >
                {line.status ? (
                  <span className="text-red-500">Desativar</span>
                ) : (
                  <span>Ativar</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="gap-2">
        <DailyLineChart lineId={line.id.toString()} showAverage />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-muted-foreground">Máquinas:</span>
          <span className="ml-1">{line.machines.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Criada a:</span>
          <span className="ml-1">{dayjs(line.createdAt).format("DD/MM/YYYY")}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
