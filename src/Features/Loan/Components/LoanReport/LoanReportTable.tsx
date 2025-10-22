import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableColumns } from "@/Features/Loan/Components/LoanReport/TableColumns";
import TablePagination from "@/Features/Loan/Components/LoanReport/TablePagination";
import {
  selectLoanReportData,
  updateLoanReportTableState,
} from "@/Features/Loan/loanSlices/LoanReport.slice";
import type { ILoanReport } from "@/Features/Loan/types/loan-report.type";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type TableState,
} from "@tanstack/react-table";

const LoanReportTable = () => {
  const { loanReport, tableState } = useAppSelector(selectLoanReportData);
  const dispatch = useAppDispatch();

  const table = useReactTable<ILoanReport>({
    data: loanReport,
    columns: tableColumns,
    onSortingChange: (updater) =>
      dispatch(updateLoanReportTableState({ key: "sorting", updater })),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: (updater) =>
      dispatch(updateLoanReportTableState({ key: "rowSelection", updater })),
    onPaginationChange: (updater) =>
      dispatch(updateLoanReportTableState({ key: "pagination", updater })),
    onGlobalFilterChange: (updater) =>
      dispatch(updateLoanReportTableState({ key: "globalFilter", updater })),
    state: tableState as unknown as Partial<TableState>,
  });

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-10 text-center bg-[#F4F4F5]"
                >
                  No results found!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default LoanReportTable;
