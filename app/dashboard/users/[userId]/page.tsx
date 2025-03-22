"use client";

import { useGetUser } from "@/src/services/users/usersQueries";
import PageHeader from "@/ui/dashboard/PageHeader";
import Profile from "@/ui/dashboard/users/[id]/profile";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const UserProfilePage = () => {
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
      },
    ],
    [user]
  );

  if (!user) return "Loading...";

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <Profile user={user} />
    </>
  );
};
export default UserProfilePage;
