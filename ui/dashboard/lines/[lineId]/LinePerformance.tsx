import LinePerformanceFilters from "./LinePerformanceFilters";
import LinePerformanceTable from "./LinePerformanceTable";
import LinePerformanceChart from "./LinePerformanceChart";

const LinePerformance = () => {
  return (
    <div className="flex flex-col gap-4">
      <LinePerformanceFilters />
      <LinePerformanceChart />
      <LinePerformanceTable />
    </div>
  );
};
export default LinePerformance;
