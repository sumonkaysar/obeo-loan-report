import type { ITableState } from "@/Features/Loan/types";

export interface ILoanReport {
  firstName: string;
  lastName: string;
  employeeId: string;
  employee: string;
  totalLoan: number;
  totalAmount: number;
  repaymentTotal: number;
}

export interface ILoanReportState {
  loanReport: ILoanReport[];
  tableState: ITableState;
}
