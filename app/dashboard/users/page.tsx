import React, { Suspense, useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import TableUsers from "@/ui/dashboard/users/TableUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import AddNewContentButton from "@/src/components/ui/addNewContentButton";

const UsersPage = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Utilizadores",
      },
    ],
    []
  );
  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <AddNewContentButton href={`/dashboard/users/create`} label={`Criar Utilizador`} />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">Utilizadores</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading users...</div>}>
            <TableUsers />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};
export default UsersPage;
