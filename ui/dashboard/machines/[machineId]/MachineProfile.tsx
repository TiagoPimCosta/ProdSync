import { LineObj } from "@/src/services/lines/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import MachineOverview from "./MachineOverview";
import MachinePerformance from "./MachinePerformance";
import { MachineObj } from "@/src/services/machines/queries";

interface MachineProfileProps {
  machine?: MachineObj;
}

const MachineProfile = ({ machine }: MachineProfileProps) => {
  if (!machine) return <div>line Not Found</div>;

  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Geral</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <MachineOverview machine={machine} />
      </TabsContent>
      <TabsContent value="performance">
        <MachinePerformance machine={machine} />
      </TabsContent>
    </Tabs>
  );
};
export default MachineProfile;
