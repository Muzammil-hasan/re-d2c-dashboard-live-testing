"use client"

import { baseApi } from "~/lib/axios"

export const getCompletedHsrp = async ({ pageIndex, pageSize }, queryKey) => {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[1]
  const { data } = await baseApi.get(`fixation/get-fixations`, {
    params: {
      page,
      pageIndex,
      limit: pageSize,
      status: "COMPLETED",
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
