import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import CreateLineForm from "@/ui/dashboard/lines/new/CreateLineForm";

const CreateLine = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Linhas",
        href: "/dashboard/lines",
      },
      {
        label: "Criar Linha",
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
            <CardTitle>Criar Linha</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CreateLineForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateLine;
