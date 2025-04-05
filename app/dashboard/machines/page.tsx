import AddNewContentButton from "@/src/components/ui/addNewContentButton";
import MachinesList from "@/ui/dashboard/machines/MachinesList";
import PageHeader from "@/ui/dashboard/PageHeader";
import React, { useMemo } from "react";

const Machinespage = () => {
  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Máquinas",
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
            <h1 className="text-2xl font-semibold md:text-3xl">Máquinas</h1>
          </div>
          <AddNewContentButton href={`/dashboard/machines/new`} label={`Criar Máquina`} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <MachinesList />
      </div>
    </div>
  );
};

export default Machinespage;
