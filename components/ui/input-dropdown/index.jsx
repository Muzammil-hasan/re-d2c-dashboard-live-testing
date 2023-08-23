"use client"

import { Fragment, useState } from "react"
import { Listbox } from "@headlessui/react"
import { IoIosArrowDown } from "react-icons/io"

import { cn } from "~/lib/utils"

import styles from "./style.module.scss"

function InputDropdown({ name, data, onChange, ...props }) {
  const [selected, setSelected] = useState(data[0])

  const handleChange = (e) => {
    onChange(e.value)
    setSelected(e)
  }

  return (
    <div className={cn(styles.listbox, props.className)}>
      <Listbox name={name} value={selected} onChange={handleChange} {...props}>
        {({ open }) => (
          <Fragment>
            <Listbox.Button
              className={cn(styles.listbox_button, open && styles.open)}
            >
              {({ value }) => (
                <Fragment>
                  <span>{value.label}</span>
                  <IoIosArrowDown size={20} />
                </Fragment>
              )}
            </Listbox.Button>
            <Listbox.Options className={styles.listbox_options}>
              {data.map((item, index) => (
                <Listbox.Option key={item.id || index} value={item}>
                  {item.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Fragment>
        )}
      </Listbox>
    </div>
  )
}

export { InputDropdown }
