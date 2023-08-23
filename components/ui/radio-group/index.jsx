"use client"

import { forwardRef, useState } from "react"
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react"
import { IoRadioButtonOff, IoRadioButtonOnSharp } from "react-icons/io5"

import { cn } from "~/lib/utils"

import styles from "./radio-group.module.scss"

const RadioGroup = forwardRef(
  ({ data, onChange, name, defaultValue, className, muted }, ref) => {
    const [selected, setSelected] = useState()

    const handleChange = (value) => {
      onChange(value)
      setSelected(value)
    }

    return (
      <HeadlessRadioGroup
        ref={ref}
        name={name}
        value={selected}
        onChange={handleChange}
        defaultValue={defaultValue}
        className={cn(styles.radio_group, className)}
      >
        {data.map(({ label, value }) => (
          <HeadlessRadioGroup.Option
            key={value}
            value={value}
            className={styles.radio_option}
          >
            {({ checked }) => (
              <div
                className={cn(
                  styles.radio_option__wrapper,
                  checked && styles.checked
                )}
              >
                {checked ? <IoRadioButtonOnSharp /> : <IoRadioButtonOff />}
                <HeadlessRadioGroup.Label
                  className={cn(
                    muted && styles.muted,
                    styles["radio_option__wrapper-label"]
                  )}
                >
                  {label}
                </HeadlessRadioGroup.Label>
              </div>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </HeadlessRadioGroup>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export { RadioGroup }
