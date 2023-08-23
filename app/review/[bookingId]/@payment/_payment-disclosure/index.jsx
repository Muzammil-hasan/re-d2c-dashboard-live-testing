"use client"

import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useQuery } from "react-query"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { getBalanceProfile } from "../../requests"
import { PaymentForm } from "./_form"

export function PaymentDisclosure({ initialData, guid }) {
  const { data: paymentProfile } = useQuery({
    initialData,
    queryKey: ["booking", "payment", guid],
    queryFn: () => getBalanceProfile(guid),
  })

  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            Balance Payment
            <IoIosArrowDown />
          </DisclosureButton>

          <DisclosurePanel>
            <PaymentForm data={paymentProfile.data} guid={guid} />
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
