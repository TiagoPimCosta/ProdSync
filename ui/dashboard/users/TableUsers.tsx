"use client";

import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useGetUsers } from "@/src/services/users/usersQueries";
import { EyeIcon, Power, PowerOff, User } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Pagination } from "@mantine/core";
import { Select } from "@mantine/core";
import { PageSizes, UserStatus, UserTypes } from "@/src/utils/consts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { useDeleteUser } from "@/src/services/users/usersMutations";
import { DatePickerWithRange } from "@/src/components/ui/datePickerWithRange";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";

export default function TableUsers() {
  const usersSearchParams = useSearchParams();
  const router = useRouter();

  const page = Number(usersSearchParams.get("page")) || 1;
  const size = Number(usersSearchParams.get("size")) || 10;
  const role = usersSearchParams.get("role") || undefined;
  const status = usersSearchParams.get("status") || undefined;
  const startAdmission = usersSearchParams.get("startAdmission") || undefined;
  const endAdmission = usersSearchParams.get("endAdmission") || undefined;

  const tableColumns = useMemo(() => {
    return [
      {
        title: "Numero",
        className: "w-16",
      },
      {
        title: "Nome",
        className: "flex-1",
      },
      {
        title: "Role",
        className: "w-32",
      },
      {
        title: "Estado",
        className: "w-32",
      },
      {
        title: "Ações",
        className: "w-32",
      },
    ];
  }, []);

  const {
    data,
    isLoading,
    refetch: refetchUsers,
  } = useGetUsers({
    page: page - 1,
    size: size,
    role: role,
    status: status,
    startAdmission: startAdmission,
    endAdmission: endAdmission,
  });
  const userDelete = useDeleteUser();

  const handleOpenProfile = (id: number) => {
    router.push(`/dashboard/users/${id}`);
  };

  const handleDeactivateUser = async (id: number) => {
    await userDelete.mutateAsync({ userId: id });
    refetchUsers();
  };

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    currentParams.set("page", page.toString());
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | null) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(usersSearchParams.toString());
      currentParams.set("size", pageSize);
      currentParams.set("page", "0");
      router.push(`?${currentParams.toString()}`);
    }
  };

  const handleChangeRole = (role: string | null) => {
    const currentParams = new URLSearchParams(usersSearchParams.toString());
    if (role) {
      currentParams.set("role", role);
    } else {
      currentParams.delete("role");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangeStatus = (status: string | null) => {
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
      dateRange.from && currentParams.set("startAdmission", dateRange.from.toDateString());
      dateRange.to && currentParams.set("endAdmission", dateRange.to.toDateString());
    } else {
      currentParams.delete("startAdmission");
      currentParams.delete("endAdmission");
    }
    currentParams.set("page", "0");
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex flex-row gap-2">
              <Select
                checkIconPosition="right"
                className="w-28"
                placeholder="Role"
                data={UserTypes}
                value={role || null}
                onChange={handleChangeRole}
                clearable
              />
              <Select
                checkIconPosition="right"
                className="w-28"
                placeholder="Status"
                data={UserStatus}
                value={status || null}
                onChange={handleChangeStatus}
                clearable
              />
              <DatePickerWithRange
                value={{
                  from: startAdmission ? dayjs(startAdmission).toDate() : undefined,
                  to: endAdmission ? dayjs(endAdmission).toDate() : undefined,
                }}
                onChange={handleChangeAdmission}
              />
            </div>
          </div>
          <div className="w-[80vw] md:w-full overflow-x-auto rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableColumns.map((column) => (
                    <TableHead className={column.className} key={column.title}>
                      {column.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="whitespace-nowrap">{user.idNumber}</TableCell>
                    <TableCell className="whitespace-nowrap">{user.name}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="outline" className="min-w-16 justify-center">
                        {user.role[0].toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant={user.status ? "success" : "destructive"}>
                        {user.status ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <EyeIcon className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleOpenProfile(user.id)}
                            className="flex items-center gap-2"
                          >
                            <User className="h-5 w-5" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeactivateUser(user.id)}
                            className="flex items-center gap-2"
                          >
                            {user.status ? (
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex">
            <div className="flex-1 justify-start">
              {(page - 1) * size + 1}-{Math.min(page * size, data?.totalItems || 0)} of{" "}
              {data?.totalItems} items
            </div>
            <div className="flex-1 items-center">
              <Pagination
                total={Math.ceil((data?.totalItems || 0) / (data?.size || 1))}
                value={page}
                onChange={handleChangePage}
              />
            </div>
            <div className="justify-end">
              <Select
                checkIconPosition="right"
                className="w-20"
                data={PageSizes}
                value={size.toString()}
                onChange={handleChangePageSize}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
