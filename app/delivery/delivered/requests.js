"use client"

import { baseApi } from "~/lib/axios"

export const getDeliveredDelivery = async (
  { pageIndex, pageSize },
  queryKey
) => {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[1]
  const { data } = await baseApi.get(`/delivery/get-delivery`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "DELIVERED",
      searchTerm,
      state,
      city,
      dealership,
      model,
      startDate,
      endDate,
    },
  })
  return data.data.foundDelivery.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
}
