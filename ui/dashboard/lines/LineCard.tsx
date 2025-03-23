import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { BarChart } from "@/src/components/ui/Charts/BarCharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { LineObj } from "@/src/services/lines/linesQueries";
import dayjs from "dayjs";
import { EllipsisIcon } from "lucide-react";
import React from "react";

interface LineCardProps {
  line: LineObj;
}

export default function LineCard(props: LineCardProps) {
  const { line } = props;

  return (
    <Card key={line.id.toString()} className="data-card animate-slide-up">
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle>{line.name}</CardTitle>
        <div className="flex flex-row gap-2 items-center">
          <Badge variant={line.status ? "success" : "destructive"} className="h-fit">
            {line.status ? "Ativo" : "Inativo"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <EllipsisIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => console.log("teste 1")}
                className="flex items-center gap-2"
              >
                Ver detalhes
              </DropdownMenuItem>
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
      <CardContent>
        <h4 className="mb-2 text-sm font-medium">Weekly Output</h4>
        <BarChart
          data={[
            { name: "Mon", value: 100 },
            { name: "Tue", value: 200 },
            { name: "Wed", value: 220 },
            { name: "Thu", value: 170 },
            { name: "Fri", value: 230 },
          ]}
          dataKey="value"
          height={120}
          barColor={line.status ? "rgb(22, 163, 74)" : "rgb(202, 138, 4)"}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-muted-foreground">Machines:</span>
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
