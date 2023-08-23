"use client"

import { baseApi } from "~/lib/axios"

export const getApprovedApplicants = async (
  { pageIndex, pageSize },
  queryKey
) => {
  const { state, city, dealership, model, startDate, endDate } = queryKey[1]
  const { data } = await baseApi.get(`/applicant/get-applicants`, {
    params: {
      page: pageIndex,
      limit: pageSize,
      status: "APPROVED",
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

export const createEnquiry = async (data) => {
  const res = await baseApi.post("/applicant/create-enquiry", data)
  return res.data
}
