import LoanReportTable from "@/Features/Loan/Components/LoanReport/LoanReportTable";
import SearchReport from "@/Features/Loan/Components/LoanReport/SearchReport";

const LoanReport = () => {
  return (
    <div className="min-h-screen">
      <SearchReport />
      <div className="px-3 py-2 bg-[#F4F4F5]">
        <div className="bg-white shadow-md rounded-xs mx-auto border">
          <div className="flex justify-between items-center border-b py-3 px-4">
            <h2 className="text-xl font-semibold">Loan Report</h2>
          </div>
          <div className="px-4 py-3">
            <LoanReportTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanReport;
