"use client"

import { baseApi } from "~/lib/axios"

export const getApplicants = async (props, queryKey) => {
  const { state, city, dealership, model, startDate, endDate } = queryKey[1]
  const { data } = await baseApi.get(`/applicant/get-applicants`, {
    params: {
      page: props.pageIndex,
      limit: props.pageSize,
      status: "PENDING",
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

export const updateRequestStatus = async ({
  guidArray,
  status,
  reason,
  description,
}) => {
  const res = await baseApi.put("/applicant/set-applicant-status", {
    status,
    guidArray,
    ...(["REJECT", "CANCELLED"].includes(status) && { reason, description }),
  })
  return res.data
}
