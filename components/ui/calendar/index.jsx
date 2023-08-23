"use client"

import { DayPicker } from "react-day-picker"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"

import styles from "./calendar.module.scss"

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(styles.calendar, className)}
      classNames={{
        months: styles.months,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles.caption_label,
        nav: styles.nav,
        nav_button: cn(
          buttonVariants({ size: "icon", variant: "none" }),
          styles.nav_button
        ),
        nav_button_previous: styles.nav_button_previous,
        nav_button_next: styles.nav_button_next,
        table: styles.table,
        head_row: styles.head_row,
        head_cell: styles.head_cell,
        row: styles.row,
        cell: styles.cell,
        day: styles.day,
        day_selected: styles.day_selected,
        day_today: styles.day_today,
        day_outside: styles.day_outside,
        day_disabled: styles.day_disabled,
        day_range_middle: styles.day_range_middle,
        day_hidden: styles.day_hidden,
        ...classNames,
      }}
      components={{
        IconLeft: (props) => <FiChevronLeft size={22} {...props} />,
        IconRight: (props) => <FiChevronRight size={22} {...props} />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
