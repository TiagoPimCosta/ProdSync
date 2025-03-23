"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { UserStatus } from "@/src/utils/consts";
import { Input } from "@/src/components/ui/input";
import { Combobox } from "@/src/components/ui/combobox";

export default function LinesFilters() {
  const linesSearchParams = useSearchParams();
  const router = useRouter();

  const name = linesSearchParams.get("name") || undefined;
  const status = linesSearchParams.get("status") || undefined;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const currentParams = new URLSearchParams(linesSearchParams.toString());
    if (name) {
      currentParams.set("name", name);
    } else {
      currentParams.delete("name");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeStatus = (status: string | undefined) => {
    const currentParams = new URLSearchParams(linesSearchParams.toString());
    if (status) {
      currentParams.set("status", status);
    } else {
      currentParams.delete("status");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-col w-full md:flex-row gap-2">
      <Input
        className="w-full md:w-full"
        placeholder="Name"
        value={name}
        onChange={handleChangeName}
      />
      <Combobox
        className="w-full md:w-1/6"
        placeholder="Status"
        data={UserStatus}
        value={status || undefined}
        onChange={handleChangeStatus}
      />
    </div>
  );
}
