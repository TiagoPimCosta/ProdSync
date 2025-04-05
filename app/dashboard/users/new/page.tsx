import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import CreateUserForm from "@/ui/dashboard/users/new/CreateUserForm";

const CreateUser = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Utilizadores",
        href: "/dashboard/users",
      },
      {
        label: "Criar Utilizador",
      },
    ],
    []
  );

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1 flex gap-4">
            <CardTitle>Criar Utilizador</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateUser;
