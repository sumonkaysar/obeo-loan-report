import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employeesData } from "@/Features/Loan/consts/employees.const";
import { getLoanReport } from "@/Features/Loan/loanSlices/LoanReport.slice";
import { loanReportSearchZodSchema } from "@/Features/Loan/validations/loan-report.validation";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const SearchReport = () => {
  const dispatch = useAppDispatch();
  const closeStartCalendar = useRef<HTMLButtonElement>(null);
  const closeEndCalendar = useRef<HTMLButtonElement>(null);
  const form = useForm({
    resolver: zodResolver(loanReportSearchZodSchema),
    defaultValues: {
      employee: "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof loanReportSearchZodSchema>
  ) => {
    try {
      let search = { employeeId: data.employee } as Partial<{
        employeeId: string;
        startDate: string;
        endDate: string;
      }>;
      if (data.startDate) {
        search = {
          ...search,
          startDate: format(data.startDate, "yyyy-MM-dd"),
        };
      }
      if (data.endDate) {
        search = {
          ...search,
          endDate: format(data.endDate, "yyyy-MM-dd"),
        };
      }
      if (Object.values(search).length > 0) {
        dispatch(getLoanReport(search));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-3 py-2 bg-[#F4F4F5]">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <h2 className="text-xl font-semibold border-b py-3 px-4">
          Search Report
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-[1fr_1fr_1fr_150px] gap-3 items-start py-3 px-4"
          >
            <FormField
              control={form.control}
              name="employee"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[100px_1fr] items-center">
                  <FormLabel className="text-[#212529]">
                    Employee Id<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a employee id" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employeesData.map((employee) => (
                        <SelectItem key={employee._id} value={employee._id}>
                          {employee.employeeId} ({employee.firstName}{" "}
                          {employee.lastName})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="sr-only">
                    Select an employee
                  </FormDescription>
                  <div />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          ref={closeStartCalendar}
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          closeStartCalendar.current?.click();
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="sr-only">
                    Pick a Date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          ref={closeEndCalendar}
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          closeEndCalendar.current?.click();
                        }}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="sr-only">
                    Pick a Date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">
                <Search />
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SearchReport;
