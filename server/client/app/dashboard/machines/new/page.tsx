import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import CreateMachineForm from "@/ui/dashboard/machines/new/CreateMachineForm";

const CreateMachine = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Máquinas",
        href: "/dashboard/machines",
      },
      {
        label: "Criar Máquina",
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
            <CardTitle>Criar Maquina</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CreateMachineForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateMachine;
