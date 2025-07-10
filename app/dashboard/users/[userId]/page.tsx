"use client";

import { useGetUser } from "@/src/services/users/queries";
import PageHeader from "@/ui/dashboard/PageHeader";
import UserProfile from "@/ui/dashboard/users/[id]/userProfile";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const UserProfilePage = () => {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId;

  if (!userId) {
    return "Invalid user ID";
  }

  const { data: user } = useGetUser({
    id: userId,
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

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <UserProfile user={user} />
    </>
  );
};
export default UserProfilePage;
