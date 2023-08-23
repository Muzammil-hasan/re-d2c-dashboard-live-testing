import { baseApi } from "~/lib/axios"

export const getBookingsOnServer = async ({ status = "" } = {}) => {
  const { data } = await baseApi(`/booking/get-bookings`, {
    params: { status },
  })
  const bookingsData = data.data.bookingsData.map((item, index) => ({
    no: index + 1,
    ...item,
  }))
  return { bookingsData, bookingsCount: data.data.bookingsCount }
}
