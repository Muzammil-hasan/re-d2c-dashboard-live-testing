"use client"

import { baseApi } from "~/lib/axios"

export const getFinanceBookings = async ({ pageIndex, pageSize }, queryKey) => {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[2]
  const { data } = await baseApi.get(`/booking/get-bookings`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "FINANCE_DISBURSEMENT",
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
