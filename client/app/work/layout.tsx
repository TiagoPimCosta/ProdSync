import SideNav from "@/app/ui/work/sidenav";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <Toaster position="top-right" />
      <div className="px-3 md:py-4 h-full md:w-full">{children}</div>
    </div>
  );
}
