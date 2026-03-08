import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import AddNewContentButton from "@/src/components/ui/addNewContentButton";
import UsersTable from "@/ui/dashboard/users/UsersTable";
import UsersFilters from "@/ui/dashboard/users/UsersFilters";

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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Utilizadores</h1>
          </div>
          <AddNewContentButton href={`/dashboard/users/new`} label={`Criar Utilizador`} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <UsersFilters />
        <UsersTable />
      </div>
    </div>
  );
};
export default UsersPage;
