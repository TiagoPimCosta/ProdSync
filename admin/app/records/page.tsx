"use client";

import { Record, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Record[]> {
  const res = await fetch("http://192.168.1.199:8080/api/records");
  const records: Record[] = await res.json();

  return records;
}

export default async function index() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
