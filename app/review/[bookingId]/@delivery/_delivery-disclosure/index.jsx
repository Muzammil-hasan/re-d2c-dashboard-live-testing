"use client"

import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { DeliveryForm } from "./_form"

export function DeliveryDisclosure({ guid, data }) {
  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            <span>Delivery</span>
            <IoIosArrowDown />
          </DisclosureButton>
          <DisclosurePanel>
            <DeliveryForm guid={guid} data={data} />
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
