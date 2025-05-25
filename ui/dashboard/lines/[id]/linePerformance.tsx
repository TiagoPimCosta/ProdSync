import React from "react";
import { LineObj } from "@/src/services/lines/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

interface LinePerformanceProps {
  line?: LineObj;
}

const LinePerformance = ({ line }: LinePerformanceProps) => {
  if (!line) return <div>line Not Found</div>;

  return (
    <div>
      <h1>Performance {line.name}.</h1>
    </div>
  );
};
export default LinePerformance;
