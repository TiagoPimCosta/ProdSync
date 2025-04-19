import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Clock } from "lucide-react";

interface ActionButtonProps {
  jobId: string;
  jobName: string;
  jobColor: string;
  onClick: (jobId: string) => void;
}

const ActionButton = ({ jobId, jobName, jobColor, onClick }: ActionButtonProps) => {
  const handleClick = () => {
    onClick(jobId);
  };

  const colorMap: Record<string, string> = {
    "bg-blue-500": "from-blue-500 to-blue-600",
    "bg-purple-500": "from-purple-500 to-purple-600",
    "bg-green-500": "from-green-500 to-green-600",
    "bg-amber-500": "from-amber-500 to-amber-600",
    "bg-red-500": "from-red-500 to-red-600",
  };

  const gradientClass = colorMap[jobColor] || "from-blue-500 to-blue-600";

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "btn-action animate-fade-in bg-gradient-to-br text-white p-4 h-fit",
        gradientClass
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
            Register Action
          </span>
          <span className="text-xl font-medium">{jobName}</span>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <Clock className="h-6 w-6" />
        </div>
      </div>
    </Button>
  );
};

export default ActionButton;
