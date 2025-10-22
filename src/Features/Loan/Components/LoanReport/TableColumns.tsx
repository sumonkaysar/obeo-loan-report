import TableColumnHeader from "@/Features/Loan/Components/LoanReport/TableColumnHeader";
import type { ILoanReport } from "@/Features/Loan/types/loan-report.type";
import type { ColumnDef } from "@tanstack/react-table";

export const tableColumns: ColumnDef<ILoanReport>[] = [
  {
    accessorKey: "sl",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="SL" />
    ),
    cell: ({ row }) => <div className="px-3">{row.index + 1}</div>,
    enableHiding: false,
    sortingFn: (rowA, rowB) => {
      return rowA.index + 1 - (rowB.index + 1);
    },
  },
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Name" />
    ),
    cell: ({ row }) => (
      <div className="px-3">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Employee Id" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("employeeId")}</div>,
  },
  {
    accessorKey: "totalLoan",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Total Loan" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("totalLoan")}</div>,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Total Amount" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("totalAmount")}</div>
    ),
  },
  {
    accessorKey: "repaymentTotal",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Repayment Total" />
    ),
    cell: ({ row }) => (
      <div className="px-3">{row.getValue("repaymentTotal")}</div>
    ),
  },
];
