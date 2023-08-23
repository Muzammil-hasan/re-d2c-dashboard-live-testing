"use client"

import { baseApi } from "~/lib/axios"

export const getCancelledBookingDetails = async (guid) => {
  const response = await baseApi.get(
    `/booking/get-booking-profile?guid=${guid}`
  )
  return response.data.data
}
export const updateRefundProcessedStatus = async (data) => {
  const response = await baseApi.put("/booking/refund-processed", data)
  return response.data
}
