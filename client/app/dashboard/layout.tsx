import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { getAuthToken } from "@/src/lib/cookies";
import { getUserStatus, UserStatusResponse } from "@/src/services/auth/queries";
import { AdminSidebar } from "@/ui/dashboard/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let user: UserStatusResponse | null = null;
  const token = await getAuthToken();

  if (token) {
    const response = await getUserStatus();

    if (response.ok) {
      user = (await response.json()) as UserStatusResponse;
    }
  }

  return (
    <div className="flex w-full flex-col">
      <SidebarProvider>
        <AdminSidebar user={user} />
        <SidebarInset>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
