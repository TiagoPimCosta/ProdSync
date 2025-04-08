"use client";

import { useSearchParams } from "next/navigation";
import { useGetMachines } from "@/src/services/machines/queries";
import MachineCard from "./MachineCard";

export default function MachinesList() {
  const machinesSearchParams = useSearchParams();

  const page = Number(machinesSearchParams.get("page")) || 1;
  const size = Number(machinesSearchParams.get("size")) || 10;
  const name = machinesSearchParams.get("name") || undefined;
  const line = machinesSearchParams.get("line") || undefined;
  const user = machinesSearchParams.get("user") || undefined;
  const status = machinesSearchParams.get("status") || undefined;

  const { data } = useGetMachines({
    page: page - 1,
    size,
    name,
    line,
    user,
    status,
  });

  if (!data?.items?.length) return <div className=" pt-5 h-24 text-center">No results</div>;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {data?.items?.map((machine) => (
        <MachineCard key={`machine-${machine.id}`} machine={machine} />
      ))}
    </div>
  );
}
