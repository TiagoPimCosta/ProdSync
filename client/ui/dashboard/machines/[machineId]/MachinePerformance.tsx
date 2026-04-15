import { MachineObj } from "@/src/services/machines/queries";
import MachinePerformanceChart from "./MachinePerformanceChart";
import MachinePerformanceFilters from "./MachinePerformanceFilters";
import MachinePerformanceTable from "./MachinePerformanceTable";
import MachineAvgActionTimeKpi from "./MachineAvgActionTimeKpi";

interface MachinePerformanceProps {
  machine: MachineObj;
}

const MachinePerformance = (props: MachinePerformanceProps) => {
  const { machine } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MachineAvgActionTimeKpi machineId={machine.id} />
      </div>
      <MachinePerformanceFilters />
      <MachinePerformanceChart />
      <MachinePerformanceTable machine={machine} />
    </div>
  );
};
export default MachinePerformance;
