"use client"

import { baseApi } from "~/lib/axios"

export const getRejectedApplicants = async (
  { pageIndex, pageSize },
  queryKey
) => {
  const { state, city, dealership, model, startDate, endDate } = queryKey[1]
  const { data } = await baseApi.get(`/applicant/get-applicants`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "REJECT",
      state,
      city,
      dealership,
      model,
      startDate,
      endDate,
    },
  })
  return data.data.applicantsData.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
}
