"use client"

import { Fragment, useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { useQuery } from "react-query"

import { useReviewStore } from "~/slices/review-store"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { getBookingProfile } from "../../requests"
import { DetailsForm } from "./form"
import { SavedForm } from "./savedForm"

export function DetailsDisclosure({ guid, initialData, status }) {
  const [isDone, setIsDone] = useState(false)
  const formId = useReviewStore((state) => state.formId)
  const setCurrentProfile = useReviewStore((state) => state.setCurrentProfile)
  const setAmount = useReviewStore((state) => state.setAmount)
  const progressList = useReviewStore((state) => state.progressList)

  const { data } = useQuery({
    initialData,
    refetchOnWindowFocus: false,
    queryKey: ["booking", formId, guid],
    queryFn: () => getBookingProfile(guid),
  })

  useEffect(() => {
    setCurrentProfile(status)
    const { motorcycleAmount, bookingAmount } = data.data.transactionDetails
    setAmount({ paid: 0, loanAmount: 0, bookingAmount, motorcycleAmount })
  }, [])

  useEffect(() => {
    setIsDone(progressList[0].done)
  }, [progressList])

  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            Booking Details
            <IoIosArrowDown />
          </DisclosureButton>

          <DisclosurePanel>
            {isDone ? (
              <SavedForm
                data={data.data}
                isDone={isDone}
                setIsDone={setIsDone}
              />
            ) : (
              <DetailsForm data={data.data} guid={guid} />
            )}
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}
