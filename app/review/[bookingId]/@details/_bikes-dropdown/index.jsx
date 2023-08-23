"use client"

import { Fragment, useState } from "react"
import { Listbox } from "@headlessui/react"
import { IoIosArrowDown } from "react-icons/io"

import { cn } from "~/lib/utils"

import styles from "./bikes-dropdown.module.scss"

function BikesDropdown({ name, data, onChange, ...props }) {
  const [filteredBikes, setFilteredBikes] = useState(data)
  const [searchTerm, setSearchTerm] = useState("")
  const [selected, setSelected] = useState(data[0])

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase()
    const filtered = data.filter(
      (bike) =>
        bike.model.toLowerCase().includes(term) ||
        bike.engineCapacity.toLowerCase().includes(term) ||
        bike.variant.toLowerCase().includes(term)
    )
    setFilteredBikes(filtered)
    setSearchTerm(term)
  }

  const handleChange = (value) => {
    onChange(value)
    setSelected(value)
  }

  return (
    <div className={cn(styles.listbox, props.className)}>
      <Listbox name={name} value={selected} onChange={handleChange}>
        {({ open }) => (
          <Fragment>
            <Listbox.Button
              className={cn(styles.listbox_button, open && styles.open)}
            >
              {({ value: { model, engineCapacity, variant } }) => (
                <Fragment>
                  <p className={styles.value}>
                    <span>{model}</span>
                    <span className={styles.value_cc}>{engineCapacity}</span>
                    <span className={styles.value_variant}>{variant}</span>
                  </p>
                  <IoIosArrowDown size={20} />
                </Fragment>
              )}
            </Listbox.Button>
            <Listbox.Options className={styles.listbox_options}>
              <input
                value={searchTerm}
                className="form-control me-2"
                placeholder="Search Motorcycle"
                onChange={handleSearchChange}
              />
              <div className={styles.separator} />
              {filteredBikes.map((item, index) => (
                <Fragment key={index}>
                  <Listbox.Option value={item}>
                    {({ selected, active }) => (
                      <Fragment>
                        <p
                          className={cn(
                            styles.value,
                            (active || selected) && styles.active
                          )}
                        >
                          <span>{item.model}</span>
                          <span className={styles.value_cc}>
                            {item.engineCapacity}
                          </span>
                          <span className={styles.value_variant}>
                            {item.variant}
                          </span>
                        </p>
                        <div className={styles.separator} />
                      </Fragment>
                    )}
                  </Listbox.Option>
                </Fragment>
              ))}
            </Listbox.Options>
          </Fragment>
        )}
      </Listbox>
    </div>
  )
}

export { BikesDropdown }
