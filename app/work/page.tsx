import React from "react";
import Machines from "@/ui/work/machines";
import { Metadata } from "next";
import { userStatus, userStatusResponse } from "@/src/lib/auth";
import { getAuthToken } from "@/src/lib/cookies";

export const metadata: Metadata = {
  title: "Trabalho",
};

export default async function WorkPage() {
  let user: userStatusResponse | null = null;
  const token = await getAuthToken();

  if (token) {
    user = await userStatus();
  }
  return <Machines user={user} />;
}
