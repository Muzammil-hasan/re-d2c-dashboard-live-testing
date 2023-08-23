"use client"

import { format } from "date-fns"

import { Calendar } from "~/components/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { DatePicker } from "~/components/input"

export function DatePickerInput({ control, name }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-100">
          <Popover>
            <PopoverTrigger>
              <FormMessage className="mb-2" />
              <FormControl>
                <DatePicker>
                  {field.value ? (
                    <span>
                      {typeof field.value === "object"
                        ? format(field.value, "dd MMMM yyyy")
                        : field.value}
                    </span>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </DatePicker>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                initialFocus
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
