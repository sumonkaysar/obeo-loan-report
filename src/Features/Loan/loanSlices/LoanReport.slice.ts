import { employeesData } from "@/Features/Loan/consts/employees.const";
import { grantedLoanData } from "@/Features/Loan/consts/grant-loan.const";
import type { ITableState } from "@/Features/Loan/types";
import type { ILoanReportState } from "@/Features/Loan/types/loan-report.type";
import { createLoanReport } from "@/Features/Loan/utils/createLoanReport";
import type { RootState } from "@/Redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";

const initialState: ILoanReportState = {
  loanReport: createLoanReport(grantedLoanData, employeesData),
  tableState: {
    globalFilter: "",
    sorting: [{ desc: false, id: "sl" }],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
};

export const loanReportSlice = createSlice({
  name: "loanReport",
  initialState,
  reducers: {
    getLoanReport: (state, action) => {
      let dateRange = {} as {
        startDate: string;
        endDate: string;
      };
      if (action.payload.startDate) {
        dateRange = {
          ...dateRange,
          startDate: action.payload.startDate,
        };
      }
      if (action.payload.endDate) {
        dateRange = {
          ...dateRange,
          endDate: action.payload.endDate,
        };
      }
      state.loanReport = createLoanReport(
        grantedLoanData,
        employeesData,
        action.payload.employeeId,
        Object.values(dateRange).length > 0 ? dateRange : undefined
      );
    },
    updateLoanReportTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const { getLoanReport, updateLoanReportTableState } =
  loanReportSlice.actions;

export const selectLoanReportData = (state: RootState) => state.loanReport;

export default loanReportSlice.reducer;
