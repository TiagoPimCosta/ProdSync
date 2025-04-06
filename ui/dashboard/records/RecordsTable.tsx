"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/src/components/ui/data-table";
import { RecordObj, useGetRecords } from "@/src/services/records/queries";
import dayjs from "dayjs";

export default function RecordsTable() {
  const recordsSearchParams = useSearchParams();
  const { push } = useRouter();

  if (!recordsSearchParams) return null;

  const page = Number(recordsSearchParams.get("page")) || 1;
  const size = Number(recordsSearchParams.get("size")) || 10;
  const user = recordsSearchParams.get("user") || undefined;
  const machine = recordsSearchParams.get("machine") || undefined;
  const startPeriod = recordsSearchParams.get("startPeriod") || undefined;
  const endPeriod = recordsSearchParams.get("endPeriod") || undefined;

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
      header: "Role",
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
    machine,
    startPeriod,
    endPeriod,
  });

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(recordsSearchParams.toString());
    currentParams.set("page", page.toString());
    push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | undefined) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(recordsSearchParams.toString());
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
