"use client";

import { Briefcase } from "lucide-react";
import ActionButton from "./ActionButton";
import { Badge } from "@/src/components/ui/badge";
import { MachineObj } from "@/src/services/machines/queries";

interface RegisterActionProps {
  machines: MachineObj[];
}

const RegisterAction = (props: RegisterActionProps) => {
  const { machines } = props;

  const colorMap = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-green-500 to-green-600",
    "from-amber-500 to-amber-600",
    "from-red-500 to-red-600",
  ];

  return (
    <div className="flex-1">
      <section className="space-y-4 animate-slide-up">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Registar trabalho</h2>
          <Badge variant="secondary" className="h-fit">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {machines?.length} {machines?.length === 1 ? "Tarefa" : "Tarefas"}
            </span>
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {machines?.map((machine, id) => (
            <ActionButton
              key={`machine-${machine.id}`}
              machine={machine}
              gradientClass={colorMap[id % 5]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RegisterAction;
