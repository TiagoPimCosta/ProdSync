"use client";
import { addRecord } from "@/lib/records";
import React, { useState } from "react";

interface Work {
  name: string;
  userId: number;
  machineId: number;
  disableTime: number;
}

const MachineButton = ({ name, machineId, disableTime }: Work) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const submitRecord = () => {
    setIsDisabled(true);
    addRecord(machineId);
    setInterval(() => setIsDisabled(false), disableTime * 1000);
  };

  return (
    <button
      onClick={submitRecord}
      disabled={isDisabled}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full h-1/4"
    >
      {name}
    </button>
  );
};

export default MachineButton;
