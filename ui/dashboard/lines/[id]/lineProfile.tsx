import React from "react";
import { LineObj } from "@/src/services/lines/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import LineOverview from "./lineOverview";
import LineConnectedMachines from "./lineConnectedMachines";
import LinePerformance from "./linePerformance";

interface LineProfileProps {
  line?: LineObj;
}

const LineProfile = ({ line }: LineProfileProps) => {
  if (!line) return <div>line Not Found</div>;

  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="machines">Machines</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <LineOverview line={line} />
      </TabsContent>
      <TabsContent value="performance">
        <LinePerformance line={line} />
      </TabsContent>
      <TabsContent value="machines">
        <LineConnectedMachines line={line} />
      </TabsContent>
    </Tabs>
  );
};
export default LineProfile;
