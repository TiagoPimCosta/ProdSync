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

export default function TableUsers() {
  const usersSearchParams = useSearchParams();
  const router = useRouter();

  const page = usersSearchParams.get("page");
  const size = usersSearchParams.get("size");

  const tableColumns = useMemo(() => {
    return [
      {
        title: "Numero",
        className: "",
      },
      {
        title: "Nome",
        className: "",
      },
      {
        title: "Role",
        className: "",
      },
      {
        title: "Estado",
        className: "",
      },
      {
        title: "",
        className: "",
      },
    ];
  }, []);

  const { data, isLoading } = useGetUsers({
    page: Number(page) ? Number(page) - 1 : 0,
    size: Number(size) ? Number(size) : 10,
  });

  const handleOpenProfile = (id: number) => {
    router.push(`/dashboard/users/${id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
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
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      {user.status ? (
                        <Badge variant="secondary">Ativo</Badge>
                      ) : (
                        <Badge variant="destructive">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <EyeIcon
                        className="h-5 w-5"
                        onClick={() => handleOpenProfile(user.idNumber)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
  );
}
