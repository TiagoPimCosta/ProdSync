"use client";
import { addRecord } from "@/app/lib/actions";
import React, { useState } from "react";
import { isDOMComponent } from "react-dom/test-utils";

interface Work {
  name: string;
  personId: number;
  machineId: number;
  disableTime: number;
}

const MachineButton = ({ name, personId, machineId, disableTime }: Work) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const submitRecord = () => {
    setIsDisabled(true);
    addRecord({ personId, machineId });
    setInterval(() => setIsDisabled(false), disableTime * 1000);
  };

  return (
    <button
      onClick={submitRecord}
      disabled={isDisabled}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full h-1/4"
    >
      {name}
    </button>
  );
};

export default MachineButton;
