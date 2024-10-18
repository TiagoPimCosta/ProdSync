import { userStatus, userStatusResponse } from "@/lib/auth";
import Navbar from "@/ui/dashboard/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: userStatusResponse | null = await userStatus();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar user={user} />
      <main className="flex flex-1 flex-col gap-4 p-4 mt-16 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
