"use client"

import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { InvoicedForm } from "./_form"

export function InvoicedDisclosure({ guid, data }) {
  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            <span>Invoiced</span>
            <IoIosArrowDown />
          </DisclosureButton>
          <DisclosurePanel>
            <InvoicedForm guid={guid} data={data} />
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
