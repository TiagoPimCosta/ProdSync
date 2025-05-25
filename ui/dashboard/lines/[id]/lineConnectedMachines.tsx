import React from "react";
import { LineObj } from "@/src/services/lines/queries";

interface LineConnectedMachinesProps {
  line?: LineObj;
}

const LineConnectedMachines = ({ line }: LineConnectedMachinesProps) => {
  if (!line) return <div>line Not Found</div>;

  return (
    <div>
      <h1>Connected Machines {line.name}.</h1>
    </div>
  );
};
export default LineConnectedMachines;
