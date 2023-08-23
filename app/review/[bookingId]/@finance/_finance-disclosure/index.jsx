"use client"

import { Fragment } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useQuery } from "react-query"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { getFinanceProfile } from "../../requests"
import { FinanceForm } from "./_form"

export function FinanceDisclosure({ initialData, guid }) {
  const { data: financeProfile } = useQuery({
    initialData,
    queryKey: ["booking", "finance", guid],
    queryFn: () => getFinanceProfile(guid),
  })

  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            Finance
            <IoIosArrowDown />
          </DisclosureButton>

          <DisclosurePanel>
            <FinanceForm
              guid={guid}
              data={financeProfile.data.transactionDetails}
            />
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
