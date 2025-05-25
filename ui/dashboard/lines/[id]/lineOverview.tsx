import React from "react";
import { LineObj } from "@/src/services/lines/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

interface LineProfileProps {
  line?: LineObj;
}

const LineOverview = ({ line }: LineProfileProps) => {
  if (!line) return <div>line Not Found</div>;

  return (
    <div>
      <h1>Overview {line.name}.</h1>
    </div>
  );
};
export default LineOverview;
