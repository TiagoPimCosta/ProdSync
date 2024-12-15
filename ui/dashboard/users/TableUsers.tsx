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
import { EyeIcon } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Pagination } from "@mantine/core";
import { Select } from "@mantine/core";

export default function TableUsers() {
  const usersSearchParams = useSearchParams();
  const router = useRouter();

  const page = Number(usersSearchParams.get("page"));
  const size = Number(usersSearchParams.get("size")) || 10;
  const role = usersSearchParams.get("role") || undefined;

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

  const { data, isLoading } = useGetUsers({
    page: page ? page - 1 : 0,
    size: size,
    role: role,
  });

  const handleOpenProfile = (id: number) => {
    router.push(`/dashboard/users/${id}`);
  };

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(usersSearchParams?.toString());
    currentParams.set("page", page.toString());
    router.push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | null) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(usersSearchParams?.toString());
      currentParams.set("size", pageSize);
      router.push(`?${currentParams.toString()}`);
    }
  };

  const handleChangeRole = (role: string | null) => {
    const currentParams = new URLSearchParams(usersSearchParams?.toString());
    if (role) {
      currentParams.set("role", role);
      router.push(`?${currentParams.toString()}`);
    } else {
      currentParams.delete("role");
      router.push(`?${currentParams.toString()}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="flex justify-between">
            <div>
              <Select
                checkIconPosition="right"
                className="w-28"
                placeholder="Role"
                data={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                ]}
                value={role}
                onChange={handleChangeRole}
                clearable
              />
            </div>
            <Select
              checkIconPosition="right"
              className="w-20"
              data={[
                { value: "10", label: "10" },
                { value: "15", label: "15" },
                { value: "25", label: "25" },
                { value: "50", label: "50" },
              ]}
              value={size.toString()}
              onChange={handleChangePageSize}
            />
          </div>
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
                  <TableCell>{user.idNumber}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="min-w-16 justify-center">
                      {user.role[0].toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.status ? (
                      <Badge variant="secondary" className="min-w-16 justify-center">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="min-w-16 justify-center">
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <EyeIcon className="h-5 w-5" onClick={() => handleOpenProfile(user.idNumber)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <Pagination
              total={Math.ceil((data?.totalItems || 0) / (data?.size || 1))}
              value={page || 1}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
}
