"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import TimePicker from "./time-picker";

interface Props {
  onChange?: (date: Date, time: string) => void;
  defaultValue: Date;
}

export default function DatePicker({
  onChange,
  defaultValue = new Date(),
}: Props) {
  const [date, setDate] = React.useState<Date>(defaultValue);
  const [time, setTime] = React.useState<string>(format(defaultValue, "HH:mm"));

  React.useEffect(() => {
    if (!onChange) return;
    const dateTime = new Date(date);
    const [hours, minutes] = time.split(":");
    dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    onChange(dateTime, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full text-left font-normal bg-white/5 border border-gray-400 text-muted hover:text-muted hover:bg-white/5",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="flex justify-between w-full">
            <span>{`${format(date, "PPP")}`}</span>
            <span>{`${time}`}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
          <div className="mt-4 flex items-center">
            <TimePicker onChange={handleTimeChange} value={time} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
