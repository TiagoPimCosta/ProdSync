"use client";

import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import TableUsers from "@/ui/dashboard/users/TableUsers";

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
      <TableUsers />
    </>
  );
};
export default UsersPage;
