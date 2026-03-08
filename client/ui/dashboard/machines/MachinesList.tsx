"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetMachines } from "@/src/services/machines/queries";
import MachineCard from "./MachineCard";
import Select from "@/src/components/ui/Select";
import { Pagination } from "@mantine/core";
import { MachinesPageSizes } from "@/src/utils/consts";

export default function MachinesList() {
  const machinesSearchParams = useSearchParams();
  const router = useRouter();
  const { push } = router;

  const page = Number(machinesSearchParams.get("page")) || 1;
  const size = Number(machinesSearchParams.get("size")) || 12;
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

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(machinesSearchParams.toString());
    currentParams.set("page", page.toString());
    push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | undefined) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(machinesSearchParams.toString());
      currentParams.set("size", pageSize);
      currentParams.set("page", "0");
      push(`?${currentParams.toString()}`);
    }
  };

  if (!data?.items?.length) return <div className=" pt-5 h-24 text-center">No results</div>;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {data?.items?.map((machine) => (
          <MachineCard key={`machine-${machine.id}`} machine={machine} />
        ))}
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center pl-4 pr-2 py-2">
          <div className="flex-1 justify-start">
            {(page - 1) * size + 1}-{Math.min(page * size, data?.totalItems || 0)} of{" "}
            {data?.totalItems || 0} items
          </div>
          <div className="flex-1 flex justify-center">
            <Pagination
              total={Math.ceil((data?.totalItems || 0) / (size || 1))}
              value={page}
              onChange={handleChangePage}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Select
              className="w-20"
              data={MachinesPageSizes}
              value={size.toString()}
              onChange={handleChangePageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
