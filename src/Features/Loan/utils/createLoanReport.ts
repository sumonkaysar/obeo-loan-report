import type { IEmployee } from "@/Features/Loan/types/employee.type";
import type { IGrantLoan } from "@/Features/Loan/types/grant-loan.type";
import type { ILoanReport } from "@/Features/Loan/types/loan-report.type";

export const createLoanReport = (
  loanData: IGrantLoan[],
  employeeData: IEmployee[],
  specificEmployeeId?: string,
  dateRange?: {
    startDate: string;
    endDate: string;
  }
): ILoanReport[] => {
  const filteredLoanData = dateRange
    ? loanData.filter((loan) => {
        const approveDate = new Date(loan.approveDate);
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        return approveDate >= startDate && approveDate <= endDate;
      })
    : loanData;

  const employeeMap = new Map(employeeData.map((emp) => [emp._id, emp]));

  const employeeLoans = filteredLoanData.reduce((acc, loan) => {
    if (!acc[loan.employee]) {
      acc[loan.employee] = [];
    }
    acc[loan.employee].push(loan);
    return acc;
  }, {} as Record<string, IGrantLoan[]>);

  const employeesToProcess = (
    specificEmployeeId
      ? [[specificEmployeeId, employeeLoans[specificEmployeeId] || []]]
      : Object.entries(employeeLoans)
  ) as [string, IGrantLoan[]][];

  return employeesToProcess
    .map(([employeeId, loans]) => {
      const employee = employeeMap.get(employeeId);
      if (!employee) return null;

      return {
        firstName: employee.firstName,
        lastName: employee.lastName,
        employeeId: employee.employeeId,
        employee: employeeId,
        totalLoan: loans.length,
        totalAmount: loans.reduce((sum, loan) => sum + loan.totalAmount, 0),
        repaymentTotal: loans.reduce(
          (sum, loan) => sum + loan.repaymentTotal,
          0
        ),
      };
    })
    .filter((report): report is ILoanReport => report !== null);
};
