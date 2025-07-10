"use client";

import { Combobox } from "@/src/components/ui/combobox";
import { DatePickerWithRange } from "@/src/components/ui/datePickerWithRange";
import { useGetUsersOptions } from "@/src/services/options/queries";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";

export default function MachinePerformanceFilters() {
  const machinePerformanceSearchParams = useSearchParams();
  const router = useRouter();

  const user = machinePerformanceSearchParams.get("user") || undefined;
  const startDate =
    machinePerformanceSearchParams.get("startDate") ||
    dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const endDate =
    machinePerformanceSearchParams.get("endDate") ||
    dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss");

  const { data: usersOptions } = useGetUsersOptions();

  const handleChangeUser = (user: string | undefined) => {
    const currentParams = new URLSearchParams(machinePerformanceSearchParams.toString());
    if (user) {
      currentParams.set("user", user);
    } else {
      currentParams.delete("user");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeAdmission = (dateRange: DateRange | undefined) => {
    const currentParams = new URLSearchParams(machinePerformanceSearchParams.toString());
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
      <Combobox
        className="w-full sm:w-1/5"
        placeholder="User"
        data={usersOptions}
        value={user || undefined}
        onChange={handleChangeUser}
      />
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
