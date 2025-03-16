"use client";

import { Badge } from "@/src/components/ui/badge";
import { UserObj, useGetUsers } from "@/src/services/users/usersQueries";
import { EllipsisIcon, Power, PowerOff, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useDeleteUser } from "@/src/services/users/usersMutations";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/src/components/ui/data-table";

export default function UsersTable() {
  const usersSearchParams = useSearchParams();
  const { push } = useRouter();

  const page = Number(usersSearchParams.get("page")) || 1;
  const size = Number(usersSearchParams.get("size")) || 10;
  const name = usersSearchParams.get("name") || undefined;
  const role = usersSearchParams.get("role") || undefined;
  const status = usersSearchParams.get("status") || undefined;
  const startAdmission = usersSearchParams.get("startAdmission") || undefined;
  const endAdmission = usersSearchParams.get("endAdmission") || undefined;

  const columnHelper = createColumnHelper<UserObj>();
  const tableColumns = [
    columnHelper.accessor("idNumber", {
      header: "Numero",
      size: 5,
      minSize: 5,
    }),
    columnHelper.accessor("name", {
      header: "Nome",
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <Badge variant="outline" className="min-w-16 justify-center">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        );
      },
    }),
    columnHelper.accessor("status", {
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue("status");

        return (
          <Badge variant={status ? "success" : "destructive"}>{status ? "Ativo" : "Inativo"}</Badge>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      size: 10,
      meta: {
        align: "center",
      },
      cell: ({ row }) => {
        const status = row.original.status;
        const userId = row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleOpenProfile(userId)}
                className="flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeactivateUser(userId)}
                className="flex items-center gap-2"
              >
                {status ? (
                  <>
                    <PowerOff className="h-5 w-5" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Power className="h-5 w-5" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ] as ColumnDef<UserObj>[];

  const { data, refetch: refetchUsers } = useGetUsers({
    page: page - 1,
    size: size,
    name: name,
    role: role,
    status: status,
    startAdmission: startAdmission,
    endAdmission: endAdmission,
  });
  const userDelete = useDeleteUser();

  const handleOpenProfile = (id: number) => {
    push(`/dashboard/users/${id}`);
  };

  const handleDeactivateUser = async (id: number) => {
    await userDelete.mutateAsync({ userId: id });
    refetchUsers();
  };

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    currentParams.set("page", page.toString());
    push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | undefined) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(usersSearchParams.toString());
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
