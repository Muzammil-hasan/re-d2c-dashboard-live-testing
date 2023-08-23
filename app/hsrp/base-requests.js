import { baseApi } from "~/lib/axios"

export const getHSRPOnServer = async ({ status = "" } = {}) => {
  const { data } = await baseApi(`fixation/get-fixations`, {
    params: { status },
  })
  const hsrpData = data.data.foundFixation.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
  return { hsrpData, hsrpCount: data.data.documentCount }
}
