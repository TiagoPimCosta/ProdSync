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
    <div>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      Machinespage
    </div>
  );
};

export default Machinespage;
