import React, { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

// import styles from "./custom-calender.module.scss"

const CustomCalender = ({ onChangeFunc, themeMode }) => {
  const [value, onChange] = useState(new Date())
  return (
    <div className="custom-calender-style">
      <Calendar
        className={themeMode}
        prev2Label={false}
        next2Label={false}
        onChange={(val) => {
          onChange(val)
          onChangeFunc(
            val
              .toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .split("/")
              .reverse()
              .join("-")
          )
        }}
        // tileDisabled={({ date }) => isSunday(date)} // disable all Sundays
        value={value}
      />
    </div>
  )
}

export default CustomCalender
