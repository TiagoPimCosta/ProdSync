"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/src/components/ui/data-table";
import { RecordObj, useGetRecords } from "@/src/services/records/queries";
import dayjs from "dayjs";
import { MachineObj } from "@/src/services/machines/queries";

interface MachinePerformanceTableProps {
  machine: MachineObj;
}

export default function MachinePerformanceTable(props: MachinePerformanceTableProps) {
  const { machine } = props;
  const linePerformanceSearchParams = useSearchParams();
  const { push } = useRouter();

  const page = Number(linePerformanceSearchParams.get("page")) || 1;
  const size = Number(linePerformanceSearchParams.get("size")) || 10;
  const user = linePerformanceSearchParams.get("user") || undefined;
  const startPeriod = linePerformanceSearchParams.get("startDate") || undefined;
  const endPeriod = linePerformanceSearchParams.get("endDate") || undefined;

  const columnHelper = createColumnHelper<RecordObj>();
  const tableColumns = [
    columnHelper.accessor("id", {
      header: "Numero",
      size: 5,
      minSize: 5,
    }),
    columnHelper.accessor("user.name", {
      header: "Nome",
    }),
    columnHelper.accessor("machine.name", {
      header: "Maquina",
    }),
    columnHelper.accessor("createdAt", {
      header: "Registo",
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss");
      },
    }),
  ] as ColumnDef<RecordObj>[];

  const { data } = useGetRecords({
    page: page - 1,
    size,
    user,
    machine: machine.id.toString(),
    startPeriod,
    endPeriod,
  });

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(linePerformanceSearchParams.toString());
    currentParams.set("page", page.toString());
    push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | undefined) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(linePerformanceSearchParams.toString());
      currentParams.set("size", pageSize);
      currentParams.set("page", "0");
      push(`?${currentParams.toString()}`);
    }
  };

  return (
    <DataTable
      columns={tableColumns}
      data={data?.items || []}
      pagination={{
        totalItems: data?.totalItems || 0,
        totalPages: page,
        currentPage: page,
        size,
        onPageChange: (newPage) => {
          handleChangePage(newPage);
        },
        onPageSizeChange: (pageSize) => {
          handleChangePageSize(pageSize);
        },
      }}
    />
  );
}
