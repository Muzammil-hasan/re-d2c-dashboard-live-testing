"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Listbox } from "@headlessui/react"
import { format, subDays } from "date-fns"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"

import { Button } from "~/components/ui/button"
import LineChart from "~/components/ui/line-chart"
import OutlineDropdown from "~/components/ui/outline-dropdown"
import PieBig from "~/components/ui/pieBig"
import PieSmall from "~/components/ui/pieSmall"
import { RadioGroup } from "~/components/ui/radio-group"
import HeaderPrimary from "~/components/headerPrimary"
import OverviewTable from "~/components/overview/overviewTable"

import styles from "./home.module.scss"

const virtualDealer = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Delhi NCR",
    value: "Delhi NCR",
  },
  {
    label: "Chennai",
    value: "Chennai",
  },
]

export default function Home(props) {
  const { virtualDealerArea } = props.searchParams
  const pathName = usePathname()
  const [queryObj, setQueryObj] = useState({
    startDate: "",
    virtualDealerArea: virtualDealer[0].label,
  })

  const radioData = [
    {
      label: "1 Month",
      value: "1 month",
    },
    {
      label: "2 Month",
      value: "2 month",
    },
    {
      label: "3 Month",
      value: "3 month",
    },
    {
      label: "6 Month",
      value: "6 month",
    },
    {
      label: "12 Month",
      value: "12 month",
    },
  ]

  const handleChangeDropdown = (value) => {
    setQueryObj({
      ...queryObj,
      virtualDealerArea: value,
    })
  }

  const getdate = (day) => {
    const currentDate = new Date()
    const startDate = subDays(currentDate, day)
    return { startDate }
  }

  const handleChangeRadio = (value) => {
    if (value === "1 month") {
      const { startDate } = getdate(30)
      const start = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: start,
      })
    } else if (value === "2 month") {
      const { startDate } = getdate(60)
      const start = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: start,
      })
    } else if (value === "3 month") {
      const { startDate } = getdate(90)
      const start = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: start,
      })
    } else if (value === "6 month") {
      const { startDate } = getdate(180)
      const start = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: start,
      })
    } else {
      const { startDate } = getdate(365)
      const start = JSON.stringify(format(startDate, "yyyy-MM-dd"))
      setQueryObj({
        ...queryObj,
        startDate: start,
      })
    }
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
    <div className={styles.overviewPage}>
      <div className={styles.virtulMain}>
        <div className={styles.virtulFlex}>
          <div className={styles.title}>
            Select virtual dealer to change the data
          </div>
          <div className="d-md-flex w-100 justify-content-end">
            <OutlineDropdown
              isKey="virtualDealer"
              value={queryObj.virtualDealerArea}
              data={virtualDealer}
              handleChangeDropdown={(e) =>
                handleChangeDropdown(e, "virtualDealer")
              }
              className="me-3 col-md-7"
            />
            <Button variant="accent" size="wide">
              <Link
                href={{
                  pathname: pathName,
                  query: queryObj,
                }}
              >
                APPLY
              </Link>
              <IoIosArrowForward />
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <HeaderPrimary title="Overview" />
        <div className={styles.radioDropdown}>
          <Listbox>
            <Listbox.Button>
              1 Month
              <span className={styles.dropdownIcon}>
                <IoIosArrowDown size={14} />
              </span>
            </Listbox.Button>
            <Listbox.Options className={styles.radioDropdownMenu}>
              <Listbox.Option>
                <Link
                  href={{
                    pathname: pathName,
                    query: { startDate: queryObj.startDate },
                  }}
                >
                  <RadioGroup
                    name="radio"
                    data={radioData}
                    onChange={handleChangeRadio}
                  />
                </Link>
              </Listbox.Option>
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div className={styles.graphFlex}>
        <div className={styles.graphContainer}>
          <PieBig
            title="Motorcycles Booked"
            virtualDealerArea={virtualDealerArea}
            startDate={queryObj.startDate}
          />
        </div>
        <div className={styles.graphContainer}>
          <h5>Motorcycles Sold</h5>
          <LineChart
            startDate={queryObj.startDate}
            virtualDealerArea={virtualDealerArea}
          />
        </div>
      </div>
      <div className={`${styles.tableGraphOverview || ""} row`}>
        <div className="dashboardTable col-md-8">
          <OverviewTable
            startDate={queryObj.startDate}
            virtualDealerArea={virtualDealerArea}
          />
        </div>
        <div className="col-md-4">
          <PieSmall
            virtualDealerArea={virtualDealerArea}
            graphHeight="200px"
            title="Request Management"
            startDate={queryObj.startDate}
          />
        </div>
      </div>
    </div>
  )
}
