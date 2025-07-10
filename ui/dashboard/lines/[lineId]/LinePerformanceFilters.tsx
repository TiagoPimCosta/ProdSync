"use client";

import { Combobox } from "@/src/components/ui/combobox";
import { DatePickerWithRange } from "@/src/components/ui/datePickerWithRange";
import { useGetMachinesOptions, useGetUsersOptions } from "@/src/services/options/queries";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";

export default function LinePerformanceFilters() {
  const LinePerformanceSearchParams = useSearchParams();
  const router = useRouter();

  const user = LinePerformanceSearchParams.get("user") || undefined;
  const machine = LinePerformanceSearchParams.get("machine") || undefined;
  const startDate =
    LinePerformanceSearchParams.get("startDate") ||
    dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const endDate =
    LinePerformanceSearchParams.get("endDate") ||
    dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

  const { data: usersOptions } = useGetUsersOptions();
  const { data: machinesOptions } = useGetMachinesOptions();

  const handleChangeUser = (user: string | undefined) => {
    const currentParams = new URLSearchParams(LinePerformanceSearchParams.toString());
    if (user) {
      currentParams.set("user", user);
    } else {
      currentParams.delete("user");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeMachine = (machine: string | undefined) => {
    const currentParams = new URLSearchParams(LinePerformanceSearchParams.toString());
    if (machine) {
      currentParams.set("machine", machine);
    } else {
      currentParams.delete("machine");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeAdmission = (dateRange: DateRange | undefined) => {
    const currentParams = new URLSearchParams(LinePerformanceSearchParams.toString());
    if (dateRange) {
      dateRange.from && currentParams.set("startDate", dayjs(dateRange.from).toISOString());
      dateRange.to && currentParams.set("endDate", dayjs(dateRange.to).toISOString());
    } else {
      currentParams.delete("startDate");
      currentParams.delete("endDate");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-col w-full md:flex-row gap-2 md:justify-between">
      <div className="flex flex-col w-full md:flex-row gap-2">
        <Combobox
          className="w-full sm:w-1/5"
          placeholder="User"
          data={usersOptions}
          value={user || undefined}
          onChange={handleChangeUser}
        />
        <Combobox
          className="w-full gap-2 sm:w-1/5"
          placeholder="Máquina"
          data={machinesOptions}
          value={machine || undefined}
          onChange={handleChangeMachine}
        />
      </div>
      <DatePickerWithRange
        className="w-full md:w-1/4"
        value={{
          from: startDate ? dayjs(startDate).toDate() : undefined,
          to: endDate ? dayjs(endDate).toDate() : undefined,
        }}
        onChange={handleChangeAdmission}
        numberOfMonths={1}
      />
    </div>
  );
}
