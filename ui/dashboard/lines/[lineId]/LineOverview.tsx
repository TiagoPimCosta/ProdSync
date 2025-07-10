import { LineObj } from "@/src/services/lines/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Pencil, Settings2 } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import dayjs from "dayjs";

interface LineOverviewProps {
  line?: LineObj;
}

const LineOverview = ({ line }: LineOverviewProps) => {
  if (!line) return <div>line Not Found</div>;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">
              <span>{line.name}</span>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" className="h-6 gap-1" asChild>
                <Link href={`/dashboard/lines/${line?.id}/edit`}>
                  <Pencil className="w-4 h-4" /> Editar
                </Link>
              </Button>
              <Badge variant={line.status ? "success" : "destructive"}>
                {line.status ? "Ativa" : "Inativa"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Criada a:</span>
                  <span>{dayjs(line.createdAt).format("DD MMM YYYY")}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Machines</CardTitle>
            <Settings2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{line.machines.length}</div>
            <p className="text-xs text-muted-foreground">{`${
              line.machines.filter((m) => m.status).length
            } active`}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default LineOverview;
