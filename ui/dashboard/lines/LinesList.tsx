"use client";

import { useGetLines } from "@/src/services/lines/queries";
import LineCard from "./LineCard";
import { useRouter, useSearchParams } from "next/navigation";
import { PageSizes } from "@/src/utils/consts";
import { Pagination } from "@mantine/core";
import Select from "@/src/components/ui/Select";

export default function LinesList() {
  const linesSearchParams = useSearchParams();
  const router = useRouter();
  const { push } = router;

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

  const handleChangePage = (page: number) => {
    const currentParams = new URLSearchParams(linesSearchParams.toString());
    currentParams.set("page", page.toString());
    push(`?${currentParams.toString()}`);
  };

  const handleChangePageSize = (pageSize: string | undefined) => {
    if (pageSize) {
      const currentParams = new URLSearchParams(linesSearchParams.toString());
      currentParams.set("size", pageSize);
      currentParams.set("page", "0");
      push(`?${currentParams.toString()}`);
    }
  };

  if (!data?.items?.length) return <div className=" pt-5 h-24 text-center">No results</div>;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {data.items.map((line) => (
          <LineCard key={`line-${line.id}`} line={line} />
        ))}
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center pl-4 pr-2 py-2">
          <div className="flex-1 justify-start">
            {(page - 1) * size + 1}-{Math.min(page * size, data?.totalItems || 0)} of{" "}
            {data?.totalItems || 0} items
          </div>
          <div className="flex-1 flex justify-center">
            <Pagination
              total={Math.ceil((data?.totalItems || 0) / (size || 1))}
              value={page}
              onChange={handleChangePage}
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Select
              className="w-20"
              data={PageSizes}
              value={size.toString()}
              onChange={handleChangePageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
