import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { TbCalendar } from "react-icons/tb"

import { cn } from "~/lib/utils"

import styles from "./input.module.scss"

const Input = React.forwardRef(
  ({ className, rounded, type, ...props }, ref) => {
    if (type === "phone") {
      return (
        <div className={styles.phone_input}>
          <span className={rounded && styles.rounded}>+91</span>
          <input
            type={"tel"}
            className={cn(styles.input, rounded && styles.rounded, className)}
            ref={ref}
            {...props}
          />
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(styles.input, rounded && styles.rounded, className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

const Textarea = React.forwardRef(
  ({ className, rounded, rows = 2, ...props }, ref) => {
    return (
      <textarea
        rows={rows}
        className={cn(styles.textarea, rounded && styles.rounded, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const DatePicker = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <button className={cn(styles.datePicker, className)} {...props} ref={ref}>
        {children}
        <TbCalendar size={25} opacity={0.9} />
      </button>
    )
  }
)
DatePicker.displayName = "DatePicker"

const FileInput = ({ children, className, rounded, ...props }) => {
  const inputRef = React.useRef(null)

  const handleUploadClick = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }
  return (
    <div
      onClick={handleUploadClick}
      className={cn(styles.fileInput, rounded && styles.rounded, className)}
    >
      {children}
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        {...props}
      />
    </div>
  )
}

const TimePicker = ({ className, setValue, register, ...props }) => {
  const [hour, setHour] = useState("12")
  const [minute, setMinute] = useState("00")
  const [ampm, setAmPm] = useState("AM")

  const updateValue = useCallback(() => {
    if (typeof setValue === "function") {
      setValue(register.name, `${hour}:${minute}${ampm}`)
    }
  }, [hour, minute, ampm])

  useEffect(() => {
    updateValue()
  }, [updateValue])

  return (
    <div className={className}>
      <input type="hidden" {...register} />
      <div className={styles.time_picker}>
        <input
          className={cn(styles.sub_input, styles.hour)}
          type="number"
          min="1"
          max="12"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <span>:</span>
        <input
          className={cn(styles.sub_input, styles.minute)}
          type="number"
          min="0"
          max="59"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
        />
        <select
          value={ampm}
          className={cn(styles.sub_input, styles.ampm)}
          onChange={(e) => setAmPm(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  )
}

export { DatePicker, FileInput, Input, Textarea, TimePicker }
