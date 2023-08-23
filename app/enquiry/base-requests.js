import { baseApi } from "~/lib/axios"

export const getEnquiryOnServer = async ({ status = "" }) => {
  const { data } = await baseApi("/query/get-all", {
    params: { status },
  })

  const enquiryData = data.data.foundQueries.map((item, index) => ({
    no: index + 1,
    ...item,
  }))

  return { enquiryData, enquiryCount: data.data.documentCount }
}
