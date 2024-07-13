import SideNav from "../ui/work/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="px-3 md:py-4 h-full md:w-full">{children}</div>
    </div>
  );
}
