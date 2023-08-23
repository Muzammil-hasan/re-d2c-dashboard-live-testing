"use client"

import { baseApi } from "~/lib/axios"

export const getInvoiced = async ({ pageIndex, pageSize = 10 }, queryKey) => {
  console.log("query key", queryKey)
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    queryKey[1]
  const { data } = await baseApi.get(`/invoice/get-invoice`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      state,
      searchTerm,
      city,
      dealership,
      model,
      startDate,
      endDate,
    },
  })
  const invoicedData = data.data.foundInvoice.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
  return { invoicedData, invoicedCount: data.data.documentCount }
}
