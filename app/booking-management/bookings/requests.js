"use client"

import { baseApi } from "~/lib/axios"

export const getBookings = async ({ pageIndex, pageSize }, queryKey) => {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[1]
  const { data } = await baseApi.get(`/booking/get-bookings`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "MOTORCYCLE_BOOKED",
      searchTerm,
      state,
      city,
      dealership,
      model,
      startDate,
      endDate,
    },
  })
  return data.data.bookingsData.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
}
