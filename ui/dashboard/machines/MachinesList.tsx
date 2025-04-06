"use client";

import { useSearchParams } from "next/navigation";
import { useGetMachines } from "@/src/services/machines/queries";
import MachineCard from "./MachineCard";

export default function MachinesList() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  const { data } = useGetMachines({
    page: page - 1,
    size: size,
  });

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {data?.items?.map((machine) => (
        <MachineCard key={`machine-${machine.id}`} machine={machine} />
      ))}
    </div>
  );
}
