"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/src/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import dayjs from "dayjs";

export type DatePickerWithRangeProps = {
  className?: string;
  value: DateRange | undefined;
  numberOfMonths?: number;
  onChange: (value: DateRange | undefined) => void;
};

export function DatePickerWithRange(props: DatePickerWithRangeProps) {
  const { className, value, numberOfMonths = 2, onChange } = props;

  const [date, setDate] = React.useState<DateRange | undefined>(value);

  const handleChangeDate = (value: DateRange | undefined) => {
    setDate(value);
    onChange(value);
  };

  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal gap-3",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("DD MMM YYYY")} - {dayjs(date.to).format("DD MMM YYYY")}
                </>
              ) : (
                dayjs(date.from).format("DD MMM YYYY")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChangeDate}
            numberOfMonths={numberOfMonths}
          />
          {/* <Separator />
          <Button
            className="w-full rounded-t-none"
            variant="ghost"
            disabled={!date}
            onClick={() => setDate(undefined)}
          >
            Clear
          </Button> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}
