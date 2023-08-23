"use client"

import { baseApi } from "~/lib/axios"

export const getPendingInsurance = async (
  { pageIndex, pageSize },
  queryKey
) => {
  console.log("query key", queryKey)
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[0]
  const { data } = await baseApi.get(`/insurance/get-insurance`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "PENDING",
      searchTerm,
      state,
      city,
      dealership,
      model,
      startDate,
      endDate,
    },
  })
  return data.data.foundInsurance.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
}
