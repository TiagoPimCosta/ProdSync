import { SidebarProvider } from "@/src/components/ui/sidebar";
import { userStatus, userStatusResponse } from "@/src/lib/auth";
import { getAuthToken } from "@/src/lib/cookies";
import { AdminSidebar } from "@/ui/dashboard/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let user: userStatusResponse | null = null;
  const token = await getAuthToken();

  if (token) {
    user = await userStatus();
  }

  return (
    <div className="flex w-full flex-col">
      <SidebarProvider>
        <AdminSidebar user={user} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
      </SidebarProvider>
    </div>
  );
}
