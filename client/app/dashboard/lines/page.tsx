import React, { useMemo } from "react";
import PageHeader from "@/ui/dashboard/PageHeader";
import AddNewContentButton from "@/src/components/ui/addNewContentButton";
import LinesList from "@/ui/dashboard/lines/LinesList";
import LinesFilters from "@/ui/dashboard/lines/LinesFilters";

const LinesPage = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Linhas de Produção",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Linhas de Produção</h1>
          </div>
          <AddNewContentButton href={`/dashboard/lines/new`} label={`Criar Linha`} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <LinesFilters />
        <LinesList />
      </div>
    </div>
  );
};
export default LinesPage;
