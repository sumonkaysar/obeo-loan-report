import z from "zod";

export const loanReportSearchZodSchema = z
  .object({
    employee: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Employee Id is required"
            : "Employee Id must be a string",
      })
      .nonempty("Employee Id can't be blank"),

    startDate: z.date("Start date must be a date").optional(),
    endDate: z.date("End date must be a date").optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && !data.endDate) {
        return false;
      }
      if (!data.startDate && data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "Both start date and end date must be provided",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      } else if (!data.startDate || !data.endDate) {
        return true;
      }
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );
