import Machines from "@/ui/work/machines";
import { Metadata } from "next";
import { getAuthToken } from "@/src/lib/cookies";
import { getUserStatus, UserStatusResponse } from "@/src/services/auth/queries";

export const metadata: Metadata = {
  title: "Trabalho",
};

export default async function WorkPage() {
  let user: UserStatusResponse | null = null;
  const token = await getAuthToken();

  if (token) {
    user = await getUserStatus();
  }
  return <Machines user={user} />;
}
