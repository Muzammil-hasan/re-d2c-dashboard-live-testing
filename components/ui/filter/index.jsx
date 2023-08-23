"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { format, subDays } from "date-fns"
import { FiFilter } from "react-icons/fi"
import { IoIosArrowDown } from "react-icons/io"

import { Button } from "~/components/ui/button"
import bikes from "~/json/bikes.json"
import cities from "~/json/cities.json"
import states from "~/json/states.json"

import CustomCalender from "../custom-calender"
import OutlineDropdown from "../outline-dropdown"
import { RadioGroup } from "../radio-group"
import styles from "./style.module.scss"

const dealership = [
  {
    id: 1,
    label: "New Delhi",
    value: "New Delhi",
  },
  {
    id: 2,
    label: "Chennai",
    value: "Chennai",
  },
]

const radioData = [
  {
    label: "1 Week",
    value: "1 Week",
  },
  {
    label: "2 Weeks",
    value: "2 Weeks",
  },
  {
    label: "1 Month",
    value: "1 Month",
  },
  {
    label: "Custom",
    value: "Custom",
  },
]

const bikesModel = bikes.map((data) => {
  return {
    label: data.model,
    value: data.model,
  }
})

export function Filter() {
  const pathName = usePathname()
  const router = useRouter()
  const [open, _setOpen] = useState(false)
  const [isActive, setActive] = useState("false")
  const [isDisabled, setIsDisabled] = useState(true)
  const [isDatePicker, setIsDatePicker] = useState(false)
  // const [value, setValue] = useState(new Date())
  const [queryObj, setQueryObj] = useState({
    state: "",
    city: "",
    dealership: "",
    model: "",
    startDate: "",
  })

  const handleChangeDropdown = (value, key) => {
    setIsDisabled(false)
    if (key === "state") {
      setQueryObj({
        ...queryObj,
        state: value,
      })
    } else if (key === "city") {
      setQueryObj({
        ...queryObj,
        city: value,
      })
    } else if (key === "model") {
      setQueryObj({
        ...queryObj,
        model: value,
      })
    } else {
      setQueryObj({
        ...queryObj,
        dealership: value,
      })
    }
  }

  const getdate = (day) => {
    const currentDate = new Date()
    const startDate = subDays(currentDate, day)
    return { startDate }
  }

  const handleChange = (value) => {
    setIsDisabled(false)
    if (value === "1 Week") {
      const { startDate } = getdate(7)
      const start = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: start,
      })
      setIsDatePicker(false)
    } else if (value === "2 Week") {
      const { startDate } = getdate(14)
      const week = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: week,
      })
      setIsDatePicker(false)
    } else if (value === "Custom") {
      setIsDatePicker(true)
    } else {
      const { startDate } = getdate(30)
      const month = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: month,
      })
      setIsDatePicker(false)
    }
  }

  const ToggleClass = () => {
    setActive(!isActive)
  }

  const resetQueryParams = () => {
    setQueryObj({})
    setIsDisabled(true)
    router.push(pathName)
  }

  const handleCalenderChange = (value) => {
    setQueryObj({
      ...queryObj,
      startDate: value,
    })
  }

  useEffect(() => {
    setQueryObj((prev) => {
      const newData = { ...prev }
      Object.keys(newData).map((key, index) => {
        if (newData[key] === "") {
          delete newData[key]
        }
      })
      return newData
    })
  }, [])

  return (
    <div className={isActive ? "inactive" : "activeBtn"}>
      <div className={`${styles.filterDropdown} filterDropdown`}>
        <Menu>
          <Menu.Button
            className={`${styles.filterBtn} filterBtn`}
            onClick={ToggleClass}
          >
            Filter <FiFilter />
          </Menu.Button>
          <Menu.Items className={`${styles.dropdownOpen}`}>
            <div className={styles.filterDropdownCols}>
              <div className={styles.headerTitle}>
                Filter{" "}
                <button disabled={isDisabled} onClick={resetQueryParams}>
                  Reset all
                </button>
              </div>
              <div className={styles.filterAccordion}>
                <Disclosure>
                  <Disclosure.Button className={styles.accordianButton}>
                    Dates
                    <div
                      className={
                        open ? styles.arrowInactive : styles.arrowActive
                      }
                    >
                      <IoIosArrowDown size={18} />
                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className={styles.panelStyle}>
                      <div className={styles.radioList}>
                        <RadioGroup
                          name={"startDate"}
                          onChange={handleChange}
                          data={radioData}
                        />
                        {isDatePicker && (
                          <CustomCalender
                            themeMode="light"
                            onChangeFunc={handleCalenderChange}
                            value={queryObj.startDate}
                          />
                        )}
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </div>
              <div className={styles.filterAccordion}>
                <Disclosure>
                  <Disclosure.Button className={styles.accordianButton}>
                    Model
                    <div
                      className={
                        open ? styles.arrowInactive : styles.arrowActive
                      }
                    >
                      <IoIosArrowDown size={18} />
                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className={styles.panelStyle}>
                      <div className={styles.filterPanleSearch}>
                        <OutlineDropdown
                          placeholder="Select model"
                          isKey="model"
                          value={queryObj.model}
                          data={bikesModel}
                          handleChangeDropdown={(e) =>
                            handleChangeDropdown(e, "model")
                          }
                        />
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </div>
              <div className={styles.filterAccordion}>
                <Disclosure>
                  <Disclosure.Button className={styles.accordianButton}>
                    State
                    <div
                      className={
                        open ? styles.arrowInactive : styles.arrowActive
                      }
                    >
                      <IoIosArrowDown size={18} />
                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className={styles.panelStyle}>
                      <div className={styles.filterPanleSearch}>
                        <OutlineDropdown
                          placeholder="Select state"
                          isKey="state"
                          value={queryObj.state}
                          data={states}
                          handleChangeDropdown={(e) =>
                            handleChangeDropdown(e, "state")
                          }
                        />
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </div>
              <div className={styles.filterAccordion}>
                <Disclosure>
                  <Disclosure.Button className={styles.accordianButton}>
                    City
                    <div
                      className={
                        open ? styles.arrowInactive : styles.arrowActive
                      }
                    >
                      <IoIosArrowDown size={18} />
                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className={styles.panelStyle}>
                      <div className={styles.filterPanleSearch}>
                        <OutlineDropdown
                          isKey="city"
                          placeholder="Select city"
                          value={queryObj.city}
                          data={cities}
                          handleChangeDropdown={(e) =>
                            handleChangeDropdown(e, "city")
                          }
                        />
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </div>
              <div className={styles.filterAccordion}>
                <Disclosure>
                  <Disclosure.Button className={styles.accordianButton}>
                    Dealership
                    <div
                      className={
                        open ? styles.arrowInactive : styles.arrowActive
                      }
                    >
                      <IoIosArrowDown size={18} />
                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className={styles.panelStyle}>
                      <div className={styles.filterPanleSearch}>
                        <OutlineDropdown
                          isKey="dealer"
                          value={queryObj.dealership}
                          data={dealership}
                          placeholder="Select Dealership"
                          handleChangeDropdown={(e) =>
                            handleChangeDropdown(e, "dealer")
                          }
                        />
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </Disclosure>
              </div>

              <div className={styles.applyBtn}>
                <Button type="submit" variant="accent" size="small">
                  <Link
                    href={{
                      pathname: pathName,
                      query: queryObj,
                    }}
                  >
                    Apply
                  </Link>
                </Button>
              </div>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  )
}
