import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

interface JobCardProps {
  id: string;
  name: string;
  color: string;
}

const JobCard = ({ id, name, color }: JobCardProps) => {
  return (
    <Card className="card-job animate-scale-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <div className={cn("w-3 h-3 rounded-full mr-2", color)} />
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">Job ID: {id}</div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
