"use client"

import React from "react"
import { useQuery } from "react-query"

import CancelBooking from "~/components/bookings-management/cancelBooking"

import { getCancelledBookingDetails } from "./request"

const CancelledBookingDetails = ({ params }) => {
  const { data } = useQuery(["CancelledBookingData", params.id], () =>
    getCancelledBookingDetails(params.id)
  )
  console.log("parentData", data)
  return <div>{data && <CancelBooking cancelledDetails={data} />}</div>
}

export default CancelledBookingDetails
