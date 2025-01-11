import React, { Suspense, useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import TableUsers from "@/ui/dashboard/users/TableUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { PlusCircle } from "lucide-react";

const UsersPage = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Funcionários",
      },
    ],
    []
  );
  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex gap-1 text-2xl font-bold">Funcionários</CardTitle>
            <Button className="gap-2" variant="secondary">
              <PlusCircle />
              Criar Funcionário
            </Button>
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
