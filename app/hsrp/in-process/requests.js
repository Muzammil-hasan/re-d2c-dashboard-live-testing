"use client"

import { baseApi } from "~/lib/axios"

export const getHSRPInProcess = async ({ pageIndex, pageSize }, queryKey) => {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[2]
  const { data } = await baseApi.get(`fixation/get-fixations`, {
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
  return data.data.foundFixation.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
}
