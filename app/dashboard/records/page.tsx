import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import RecordsTable from "@/ui/dashboard/records/RecordsTable";
import RecordsFilters from "@/ui/dashboard/records/RecordsFilters";

const RecordsPage = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Registos",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold md:text-3xl">Registos</h1>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <RecordsFilters />
        <RecordsTable />
      </div>
    </div>
  );
};
export default RecordsPage;
