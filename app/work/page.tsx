import React from "react";
import Machines from "@/ui/work/machines";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabalho",
};

const WorkPage = () => {
  return <Machines />;
};

export default WorkPage;
