import { baseApi } from "~/lib/axios"

export const getInsuranceOnServer = async ({ status = "" } = {}) => {
  const { data } = await baseApi(`/insurance/get-insurance`, {
    params: { status },
  })
  const foundInsurance = data.data.foundInsurance.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
  return { foundInsurance, documentCount: data.data.documentCount }
}
