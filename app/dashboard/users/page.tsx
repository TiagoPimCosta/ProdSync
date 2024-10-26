"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Plus, Trash2, Pencil, AlertTriangle } from "lucide-react";
("lucide-react");
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { deleteUser, getAllUsers, userResponse } from "@/lib/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Combobox } from "@/components/ui/combobox";

const UserStates = [
  {
    value: "next.js",
    label: "Ativo",
  },
  {
    value: "sveltekit",
    label: "Inativo",
  },
];

const UsersPage = () => {
  const [users, setUsers] = useState<userResponse[] | []>([]);

  const [numberFilter, setNumberFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [filteredUsers, setFilteredUsers] = useState<userResponse[] | []>([]);
  const [stateFilter, setStateFilter] = useState<string | null>(null);

  const rowsPerPage = 10;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(rowsPerPage);

  const router = useRouter();
  const pathname = usePathname();

  const fetchData = async () => {
    const usersData = await getAllUsers();

    setUsers(usersData);
    setFilteredUsers(usersData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users
        ? users.filter(
            (user) =>
              user.id.toString().includes(numberFilter) &&
              user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
              (roleFilter === "all" || user.role === roleFilter)
            //  &&(stateFilter === "all" ||
            //   user.isActive === (stateFilter === "true"))
          )
        : []
    );
    setStartIndex(0);
    setEndIndex(rowsPerPage);
  }, [numberFilter, nameFilter, users, roleFilter, stateFilter]);

  const deleteUserHandler = async (id: number) => {
    await deleteUser(id);
    fetchData();
  };

  const prevPage = () => {
    if (startIndex !== 0) {
      setStartIndex(startIndex - rowsPerPage);
      setEndIndex(endIndex - rowsPerPage);
    }
  };

  const nextPage = () => {
    if (filteredUsers && filteredUsers.length > endIndex) {
      setStartIndex(startIndex + rowsPerPage);
      setEndIndex(endIndex + rowsPerPage);
    }
  };

  const handleNumberFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberFilter(event.target.value);
  };
  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };
  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(role);
  };

  const handleStateFilterChange = (state: string) => {
    if (state === "all") {
      setStateFilter(null);
    } else {
      setStateFilter(state);
    }
  };
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1 flex gap-4">
          <CardTitle>Utilizadores</CardTitle>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => {
              router.push(pathname + "/create");
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex sm:flex-row flex-col w-full gap-2 pb-4">
          <Input
            placeholder="Número"
            type="number"
            className="sm:max-w-32 w-full"
            value={numberFilter}
            onChange={handleNumberFilterChange}
          />
          <Input
            placeholder="Nome"
            className="w-full"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />

          <div className="flex flex-row sm:w-64 w-full gap-2 pb-4">
            <Select
              value={roleFilter}
              onValueChange={(e) => handleRoleFilterChange(e.toString())}
            >
              <SelectTrigger className="sm:w-32 w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            {/* <Select
              value={stateFilter}
              onValueChange={(e: string) => handleStateFilterChange(e)}
            >
              <SelectTrigger className="sm:w-32 w-full">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Ativo</SelectItem>
                <SelectItem value="false">Inativo</SelectItem>
                <SelectItem value="all">Clear Filter</SelectItem>
              </SelectContent>
            </Select> */}
            <Combobox values={UserStates} placeholder="Estado" />
          </div>
        </div>
        {filteredUsers?.length === 0 ? (
          <>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Nenhum utilizador encontrado.</AlertTitle>
              <AlertDescription>
                Não existe nenhum utilizador que satisfaça os filtros inseridos.
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Número</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Admissão</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.slice(startIndex, endIndex).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell
                      onClick={() => {
                        router.push(pathname + "/" + user.id);
                      }}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell>
                      {new Date(user.admission).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.role === "admin" ? (
                        <Badge variant="default">
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="flex flex-row gap-2 justify-center">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => {
                          router.push(pathname + "/" + user.id + "/edit");
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteUserHandler(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      startIndex === 0
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                    onClick={prevPage}
                  />
                </PaginationItem>
                <PaginationItem>
                  {startIndex + 1}-
                  {filteredUsers.length < endIndex
                    ? filteredUsers.length
                    : endIndex}{" "}
                  de {filteredUsers.length}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      filteredUsers.length <= endIndex
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                    onClick={nextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default UsersPage;
