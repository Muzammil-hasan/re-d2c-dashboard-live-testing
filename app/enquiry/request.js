"use client"

import { baseApi } from "~/lib/axios"

export const getEnquiries = async ({ pageIndex, pageSize = 10 }, queryKey) => {
  const { searchTerm } = queryKey[1]
  const { data } = await baseApi.get(`/query/get-all`, {
    params: { page: pageIndex, limit: pageSize, status: "", searchTerm },
  })

  return data.data.foundQueries.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
}

export const getEnquiryDetails = async (guid) => {
  const { data } = await baseApi.get(`query?guid=${guid}`)
  console.log("data api", data.data)
  console.log("guidapi,", guid)
  return data.data
}

export const updateQueryStatus = async (guid, newStatus) => {
  const response = await baseApi.put(`query?guid=${guid}&status=${newStatus}`)
  return response.data
}
