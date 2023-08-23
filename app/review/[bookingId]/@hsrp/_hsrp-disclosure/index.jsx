"use client"

import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"

import HSRPFixation from "~/components/bookings-management/hsrpFixation"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"

export function HsrpDisclosure({ guid, data }) {
  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            <span>Hsrp</span>
            <IoIosArrowDown />
          </DisclosureButton>
          <DisclosurePanel>
            <HSRPFixation guid={guid} data={data} />
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
