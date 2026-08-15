'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '@/src/components/ui/data-table';
import { RecordObj, useGetRecords } from '@/src/services/records/queries';
import { useDeleteRecord } from '@/src/services/records/mutations';
import { Button } from '@/src/components/ui/button';
import { Trash2 } from 'lucide-react';
import dayjs from 'dayjs';

export default function RecordsTable() {
  const recordsSearchParams = useSearchParams();
  const { push } = useRouter();

  const page = Number(recordsSearchParams.get('page')) || 1;
  const size = Number(recordsSearchParams.get('size')) || 10;
  const user = recordsSearchParams.get('user') || undefined;
  const machine = recordsSearchParams.get('machine') || undefined;
  const startPeriod = recordsSearchParams.get('startPeriod') || undefined;
  const endPeriod = recordsSearchParams.get('endPeriod') || undefined;

  function formatDuration(seconds: number | null): string {
    if (seconds === null) return '-';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    }
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  const columnHelper = createColumnHelper<RecordObj>();
  const tableColumns = [
    columnHelper.accessor('user.name', {
      header: 'Nome',
    }),
    columnHelper.accessor('machine.name', {
      header: 'Maquina',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Registo',
      cell: ({ row }) => {
        const createdAt = row.original.createdAt;
        return dayjs(createdAt).format('YYYY/MM/DD HH:mm:ss');
      },
    }),
    columnHelper.accessor('timeSincePrevious', {
      header: 'Tempo desde anterior',
      cell: ({ row }) => formatDuration(row.original.timeSincePrevious),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Ações',
      size: 10,
      meta: { align: 'center' },
      cell: ({ row }) => (
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 text-red-500 hover:text-red-600"
          onClick={() => handleDeleteRecord(row.original.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
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

  const recordDelete = useDeleteRecord();

  const handleDeleteRecord = async (id: string) => {
    await recordDelete.mutateAsync(id);
  };

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(recordsSearchParams.toString());
    currentParams.set('page', page.toString());
    push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | undefined) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(recordsSearchParams.toString());
      currentParams.set('size', pageSize);
      currentParams.set('page', '0');
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
