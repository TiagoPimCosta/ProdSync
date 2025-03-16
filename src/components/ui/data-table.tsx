import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import Select from "./Select";
import { PageSizes } from "@/src/utils/consts";
import { Pagination } from "@mantine/core";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    size: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: string | undefined) => void;
  };
}

export function DataTable<TData, TValue>(dataTableProps: DataTableProps<TData, TValue>) {
  const { data, columns, pagination } = dataTableProps;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: `${header.column.getSize()}px` }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ width: `${cell.column.getSize()}px` }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-1 justify-start">
          {(pagination.currentPage - 1) * pagination.size + 1}-
          {Math.min(pagination.currentPage * pagination.size, pagination.totalItems || 0)} of{" "}
          {pagination.totalItems} items
        </div>
        <div className="flex-1 flex justify-center">
          <Pagination
            total={Math.ceil((pagination.totalItems || 0) / (pagination.size || 1))}
            value={pagination.currentPage}
            onChange={pagination.onPageChange}
          />
        </div>
        <div className="flex-1 flex justify-end">
          <Select
            className="w-20"
            data={PageSizes}
            value={pagination.size.toString()}
            onChange={pagination.onPageSizeChange}
          />
        </div>
      </div>
    </div>
  );
}
