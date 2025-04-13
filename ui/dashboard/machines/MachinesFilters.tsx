"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Lines, UserStatus } from "@/src/utils/consts";
import { Input } from "@/src/components/ui/input";
import { Combobox } from "@/src/components/ui/combobox";
import { useGetUsersOptions } from "@/src/services/options/queries";

export default function MachinesFilters() {
  const machinesSearchParams = useSearchParams();
  const router = useRouter();

  const name = machinesSearchParams.get("name") || undefined;
  const line = machinesSearchParams.get("line") || undefined;
  const user = machinesSearchParams.get("user") || undefined;
  const status = machinesSearchParams.get("status") || undefined;

  const { data: usersOptions } = useGetUsersOptions();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const currentParams = new URLSearchParams(machinesSearchParams.toString());
    if (name) {
      currentParams.set("name", name);
    } else {
      currentParams.delete("name");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeLine = (line: string | undefined) => {
    const currentParams = new URLSearchParams(machinesSearchParams.toString());
    if (line) {
      currentParams.set("line", line);
    } else {
      currentParams.delete("line");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeUser = (user: string | undefined) => {
    const currentParams = new URLSearchParams(machinesSearchParams.toString());
    if (user) {
      currentParams.set("user", user);
    } else {
      currentParams.delete("user");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeStatus = (status: string | undefined) => {
    const currentParams = new URLSearchParams(machinesSearchParams.toString());
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
        className="w-full md:w-1/2"
        placeholder="Name"
        value={name}
        onChange={handleChangeName}
      />
      <Combobox
        className="w-full sm:w-1/6"
        placeholder="Line"
        data={Lines}
        value={line || undefined}
        onChange={handleChangeLine}
      />
      <Combobox
        className="w-full sm:w-1/6"
        placeholder="User"
        data={usersOptions}
        value={user || undefined}
        onChange={handleChangeUser}
      />
      <Combobox
        className="w-full sm:w-1/6"
        placeholder="Status"
        data={UserStatus}
        value={status || undefined}
        onChange={handleChangeStatus}
      />
    </div>
  );
}
