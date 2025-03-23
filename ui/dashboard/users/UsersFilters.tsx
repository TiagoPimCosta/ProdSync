"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { UserStatus, UserTypes } from "@/src/utils/consts";
import { DatePickerWithRange } from "@/src/components/ui/datePickerWithRange";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";
import { Input } from "@/src/components/ui/input";
import { Combobox } from "@/src/components/ui/combobox";

export default function UsersFilters() {
  const usersSearchParams = useSearchParams();
  const router = useRouter();

  const name = usersSearchParams.get("name") || undefined;
  const role = usersSearchParams.get("role") || undefined;
  const status = usersSearchParams.get("status") || undefined;
  const startAdmission = usersSearchParams.get("startAdmission") || undefined;
  const endAdmission = usersSearchParams.get("endAdmission") || undefined;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    if (name) {
      currentParams.set("name", name);
    } else {
      currentParams.delete("name");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeRole = (role: string | undefined) => {
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    if (role) {
      currentParams.set("role", role);
    } else {
      currentParams.delete("role");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeStatus = (status: string | undefined) => {
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    if (status) {
      currentParams.set("status", status);
    } else {
      currentParams.delete("status");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeAdmission = (dateRange: DateRange | undefined) => {
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    if (dateRange) {
      dateRange.from && currentParams.set("startAdmission", dayjs(dateRange.from).toISOString());
      dateRange.to && currentParams.set("endAdmission", dayjs(dateRange.to).toISOString());
    } else {
      currentParams.delete("startAdmission");
      currentParams.delete("endAdmission");
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
      <div className="flex flex-row gap-2 w-full md:w-1/4">
        <Combobox
          className="w-1/2"
          placeholder="Role"
          data={UserTypes}
          value={role || undefined}
          onChange={handleChangeRole}
        />
        <Combobox
          className="w-1/2"
          placeholder="Status"
          data={UserStatus}
          value={status || undefined}
          onChange={handleChangeStatus}
        />
      </div>
      <DatePickerWithRange
        className="w-full md:w-1/4"
        value={{
          from: startAdmission ? dayjs(startAdmission).toDate() : undefined,
          to: endAdmission ? dayjs(endAdmission).toDate() : undefined,
        }}
        onChange={handleChangeAdmission}
        numberOfMonths={1}
      />
    </div>
  );
}
