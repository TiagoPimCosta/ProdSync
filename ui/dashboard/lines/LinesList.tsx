"use client";

import { useGetLines } from "@/src/services/lines/linesQueries";
import LineCard from "./LineCard";
import { useSearchParams } from "next/navigation";

export default function LinesList() {
  const linesSearchParams = useSearchParams();

  const page = Number(linesSearchParams.get("page")) || 1;
  const size = Number(linesSearchParams.get("size")) || 10;
  const name = linesSearchParams.get("name") || undefined;
  const status = linesSearchParams.get("status") || undefined;

  const { data } = useGetLines({
    page: page - 1,
    size: size,
    name: name,
    status: status,
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {data?.items?.map((line) => (
        <LineCard line={line} />
      ))}
    </div>
  );
}
