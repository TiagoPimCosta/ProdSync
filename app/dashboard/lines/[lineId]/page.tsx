"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { useGetLine } from "@/src/services/lines/queries";
import PageHeader from "@/ui/dashboard/PageHeader";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const UserProfilePage = () => {
  const params = useParams();
  const lineId = params.lineId;

  const { data: line } = useGetLine({
    lineId: lineId as string,
  });

  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Linhas de Produção",
        href: "/dashboard/lines",
      },
      {
        label: line?.name || "Loading...",
      },
    ],
    [line]
  );

  if (!line) return "Loading...";

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview {line.name}.</TabsContent>
        <TabsContent value="performance">Performance {line.name}.</TabsContent>
        <TabsContent value="machines">Connected Machines {line.name}.</TabsContent>
      </Tabs>
    </>
  );
};
export default UserProfilePage;
