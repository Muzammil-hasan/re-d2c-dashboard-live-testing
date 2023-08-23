"use client"

import { useState } from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"

import { Button } from "~/components/ui/button"
import BalancePayment from "~/components/bookings-management/balancePayment"
import BookingDetails from "~/components/bookings-management/bookingDetails"
import Delivery from "~/components/bookings-management/delivery"
import Finance from "~/components/bookings-management/finance"
import HSRPFixation from "~/components/bookings-management/hsrpFixation"
import Insurance from "~/components/bookings-management/insurance"
import Invoiced from "~/components/bookings-management/invoice"
import ReviewLeftPanel from "~/components/bookings-management/reviewLeftPanel"
import TotalAmountCard from "~/components/bookings-management/totalAmountCard"
import UploadDocuments from "~/components/bookings-management/upload-documents"
import GoBackHeader from "~/components/goBackHeader"

import styles from "./style.module.scss"

const BookingReview = () => {
  const [open, _setOpen] = useState(false)
  return (
    <>
      <div className={styles.reviewFlex}>
        <div className={styles.leftPanel}>
          <ReviewLeftPanel />
          <TotalAmountCard />
        </div>

        <div className={`${styles.reviewAccordianMain}`}>
          <GoBackHeader />
          {/* <MotorcycleDeliveryInfo /> */}
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Booking Details
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <BookingDetails />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>

          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Finance
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <Finance />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Balance Payment
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <BalancePayment />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Documents
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <UploadDocuments />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Invoiced
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <Invoiced />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Insurance
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <Insurance />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              Delivery
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <Delivery />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <Disclosure>
            <Disclosure.Button className={styles.accordianButton}>
              HSRP Fixation
              <div className={open ? styles.arrowInactive : styles.arrowActive}>
                <IoIosArrowDown />
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
                <HSRPFixation />
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
          <div className={styles.fixedFooter}>
            <div className="mx-3">
              <Button>
                <span>Back</span>
              </Button>
            </div>

            <div>
              <Button variant="accent">
                <span>Back</span>
                <IoIosArrowForward />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingReview
