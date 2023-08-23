"use client"

import { Listbox } from "@headlessui/react"
import { IoIosArrowDown } from "react-icons/io"

import styles from "./style.module.scss"

function OutlineDropdown(props) {
  return (
    <div className={`${styles.outlineDropdownMain} ${props.className}`}>
      <Listbox
        value={
          props.isKey == "state"
            ? props.selectedState
            : props.isKey == "city"
            ? props.selectedCity
            : props.isKey === "model"
            ? props.selectedModel
            : props.isKey === "virtualDealer"
            ? props.selectedDealer
            : props.dealer
        }
        onChange={props.handleChangeDropdown}
      >
        <Listbox.Button>
          <span className={styles.dropdownIcon}>
            <IoIosArrowDown size={18} />
          </span>
          {props.value ? props.value : props.placeholder}
        </Listbox.Button>
        <Listbox.Options className={styles.outlineDropdownMenu}>
          {props?.data?.map((item, index) => (
            <Listbox.Option key={index} value={item.value}>
              {item.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default OutlineDropdown
