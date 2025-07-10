import { MachineObj } from "@/src/services/machines/queries";
import MachinePerformanceChart from "./MachinePerformanceChart";
import MachinePerformanceFilters from "./MachinePerformanceFilters";
import MachinePerformanceTable from "./MachinePerformanceTable";

interface MachinePerformanceProps {
  machine: MachineObj;
}

const MachinePerformance = (props: MachinePerformanceProps) => {
  const { machine } = props;
  return (
    <div className="flex flex-col gap-4">
      Teste
      <MachinePerformanceFilters />
      <MachinePerformanceChart />
      <MachinePerformanceTable machine={machine} />
    </div>
  );
};
export default MachinePerformance;
