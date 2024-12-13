"use client";

import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";

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
      <div>Funcionários</div>
    </>
  );
};
export default UsersPage;
