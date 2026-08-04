import Machines from "@/ui/work/machines";
import { Metadata } from "next";
import { getUserStatus, UserStatusResponse } from "@/src/services/auth/queries";

export const metadata: Metadata = {
  title: "Trabalho",
};

export default async function WorkPage() {
  const response = await getUserStatus();

  if (!response.ok) {
    return null;
  }

  const user = (await response.json()) as UserStatusResponse;

  return <Machines user={user} />;
}
