"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Machines, Users, UserStatus, UserTypes } from "@/src/utils/consts";
import { DatePickerWithRange } from "@/src/components/ui/datePickerWithRange";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";
import { Input } from "@/src/components/ui/input";
import { Combobox } from "@/src/components/ui/combobox";

export default function RecordsFilters() {
  const recordsSearchParams = useSearchParams();
  const router = useRouter();

  if (!recordsSearchParams) return null;

  const user = recordsSearchParams.get("name") || undefined;
  const machine = recordsSearchParams.get("role") || undefined;
  const startAdmission = recordsSearchParams.get("startAdmission") || undefined;
  const endAdmission = recordsSearchParams.get("endAdmission") || undefined;

  const handleChangeUser = (user: string | undefined) => {
    const currentParams = new URLSearchParams(recordsSearchParams.toString());
    if (user) {
      currentParams.set("user", user);
    } else {
      currentParams.delete("user");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeMachine = (machine: string | undefined) => {
    const currentParams = new URLSearchParams(recordsSearchParams.toString());
    if (machine) {
      currentParams.set("machine", machine);
    } else {
      currentParams.delete("machine");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeAdmission = (dateRange: DateRange | undefined) => {
    const currentParams = new URLSearchParams(recordsSearchParams.toString());
    if (dateRange) {
      dateRange.from && currentParams.set("startPeriod", dayjs(dateRange.from).toISOString());
      dateRange.to && currentParams.set("endPeriod", dayjs(dateRange.to).toISOString());
    } else {
      currentParams.delete("startPeriod");
      currentParams.delete("endPeriod");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-col w-full md:flex-row gap-2">
      <Combobox
        className="w-fit gap-2"
        placeholder="User"
        data={Users}
        value={user || undefined}
        onChange={handleChangeUser}
      />
      <Combobox
        className="w-fit gap-2"
        placeholder="Machine"
        data={Machines}
        value={machine || undefined}
        onChange={handleChangeMachine}
      />
      <DatePickerWithRange
        className="min-w-fit m"
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
