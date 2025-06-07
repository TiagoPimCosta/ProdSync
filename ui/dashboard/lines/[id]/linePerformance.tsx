import LinePerformanceFilters from "./linePerformanceFilters";
import LinePerformanceTable from "./linePerformanceTable";
import LinePerformanceChart from "./linePerformanceChart";

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
