import { baseApi } from "~/lib/axios"

export const getDeliveryOnServer = async ({ status = "" } = {}) => {
  const { data } = await baseApi(`/delivery/get-delivery`, {
    params: { status },
  })
  const deliveryData = data.data.foundDelivery.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
  return { deliveryData, deliveryCount: data.data.Count }
}
