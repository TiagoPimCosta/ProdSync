import PageHeader from "@/ui/dashboard/PageHeader";
import DashboardKpiCards from "@/ui/dashboard/DashboardKpiCards";
import DashboardProductionChart from "@/ui/dashboard/DashboardProductionChart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const pageBreadcrumbItems = [{ label: "Dashboard" }];

const DashboardPage = () => {
  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <DashboardKpiCards />
        <DashboardProductionChart />
      </div>
    </>
  );
};

export default DashboardPage;
