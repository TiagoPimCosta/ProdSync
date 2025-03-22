"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useGetUser } from "@/src/services/users/usersQueries";
import PageHeader from "@/ui/dashboard/PageHeader";
import EditUserForm from "@/ui/dashboard/users/edit/EditUserForm";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const EditUserPage = () => {
  const params = useParams();
  const userId = params.userId;

  const { data: user } = useGetUser({
    id: Number(userId),
  });

  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Utilizadores",
        href: "/dashboard/users",
      },
      {
        label: user?.name || "Loading...",
        href: "/dashboard/users/" + userId,
      },
      {
        label: "Editar",
      },
    ],
    [user]
  );

  if (!user) return "Loading...";

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1 flex gap-4">
            <CardTitle>Editar Utilizador</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <EditUserForm user={user} />
        </CardContent>
      </Card>
    </>
  );
};

export default EditUserPage;
