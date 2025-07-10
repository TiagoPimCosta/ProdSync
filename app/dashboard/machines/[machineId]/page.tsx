"use client";

import { useGetMachine } from "@/src/services/machines/queries";
import MachineProfile from "@/ui/dashboard/machines/[machineId]/MachineProfile";
import PageHeader from "@/ui/dashboard/PageHeader";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const MachineProfilePage = () => {
  const params = useParams();
  const machineId = params.machineId;

  const { data: machine } = useGetMachine({
    machineId: machineId as string,
  });

  const pageBreadcrumbItems = useMemo(
    () => [
      {
        label: "Máquinas",
        href: "/dashboard/machines",
      },
      {
        label: machine?.name || "Loading...",
      },
    ],
    [machine]
  );

  if (!machine) return "Loading...";

  return (
    <>
      <PageHeader breadcrumbItems={pageBreadcrumbItems} />
      <MachineProfile machine={machine} />
    </>
  );
};
export default MachineProfilePage;
