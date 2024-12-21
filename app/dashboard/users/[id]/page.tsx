"use client";

import { useGetUser } from "@/src/services/users/usersQueries";
import PageHeader from "@/ui/dashboard/PageHeader";
import Profile from "@/ui/dashboard/users/[id]/profile";
import React, { useMemo } from "react";

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const { data } = useGetUser({
    id: Number(params.id),
  });

  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Funcionários",
        href: "/dashboard/users",
      },
      {
        label: data?.name ? data.name : "User",
      },
    ],
    [data]
  );

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <Profile user={data} />
    </>
  );
};
export default UserProfilePage;
