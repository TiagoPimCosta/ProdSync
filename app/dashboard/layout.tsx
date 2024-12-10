import { SidebarProvider } from "@/src/components/ui/sidebar";
import { userStatus, userStatusResponse } from "@/src/lib/auth";
import { AdminSidebar } from "@/ui/dashboard/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user: userStatusResponse | null = await userStatus();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
      </SidebarProvider>
    </div>
  );
}
