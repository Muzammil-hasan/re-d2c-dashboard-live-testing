import { baseApi } from "~/lib/axios"

export const getApplicantsOnServer = async ({
  status = "",
  state = "",
  city = "",
} = {}) => {
  const { data } = await baseApi(`/applicant/get-applicants`, {
    params: { status, state, city },
  })
  const applicantsData = data.data.applicantsData.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
  return { applicantsData, applicantsCount: data.data.applicantsCount }
}
