import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { MachineObj } from "@/src/services/machines/queries";
import { useCreateRecord } from "@/src/services/records/mutations";
import { Clock } from "lucide-react";

interface ActionButtonProps {
  machine: MachineObj;
  gradientClass: string;
}

const ActionButton = (props: ActionButtonProps) => {
  const { machine, gradientClass } = props;
  const createRecord = useCreateRecord();

  const handleClick = async () => {
    const data = { userId: machine.user.id, machineId: machine.id };
    await createRecord.mutateAsync(data);
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "btn-action animate-fade-in bg-gradient-to-br text-white px-6 py-4 h-40",
        gradientClass
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="text-xl font-medium">{machine?.name}</span>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <Clock className="h-6 w-6" />
        </div>
      </div>
    </Button>
  );
};

export default ActionButton;
