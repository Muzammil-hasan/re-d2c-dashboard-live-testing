"use client"

import { baseApi } from "~/lib/axios"

export const getAllInsurance = async (
  { pageIndex, pageSize = 10 },
  queryKey
) => {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[1]
  console.log("search terms>>", queryKey)
  const { data } = await baseApi.get(`/insurance/get-insurance`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "ALL",
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
