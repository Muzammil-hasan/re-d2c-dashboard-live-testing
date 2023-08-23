"use client"

import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { Insurance } from "./_form"

export function InsuranceDisclosure({ guid, data }) {
  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            <span>Insurance</span>
            <IoIosArrowDown />
          </DisclosureButton>
          <DisclosurePanel>
            <Insurance guid={guid} data={data} />
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
