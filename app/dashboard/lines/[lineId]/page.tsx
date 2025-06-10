"use client";

import { useGetLine } from "@/src/services/lines/queries";
import LineProfile from "@/ui/dashboard/lines/[id]/LineProfile";
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
      <LineProfile line={line} />
    </>
  );
};
export default UserProfilePage;
