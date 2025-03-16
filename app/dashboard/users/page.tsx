import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import AddNewContentButton from "@/src/components/ui/addNewContentButton";
import UsersTable from "@/ui/dashboard/users/UsersTable";
import UsersFilters from "@/ui/dashboard/users/UsersFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

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
    <div className="flex flex-col gap-6">
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <AddNewContentButton href={`/dashboard/users/create`} label={`Criar Utilizador`} />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">Utilizadores</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <UsersFilters />
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  );
};
export default UsersPage;
