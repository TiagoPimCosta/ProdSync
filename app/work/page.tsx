import Machines from "@/ui/work/machines";
import { Metadata } from "next";
import { getUserStatus } from "@/src/services/auth/queries";

export const metadata: Metadata = {
  title: "Trabalho",
};

export default async function WorkPage() {
  let user = await getUserStatus();

  if (!user) {
    return null;
  }

  return <Machines user={user} />;
}
