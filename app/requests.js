import { baseApi } from "~/lib/axios"

export const getMotorcycleBookedData = async (queryKey) => {
  const { startDate, virtualDealerArea } = queryKey?.queryKey[1]
  try {
    const data = baseApi.get(`/visualisation/get-motorcycle-booked-data`, {
      params: {
        startDate,
        virtualDealerArea: virtualDealerArea || "Delhi NCR",
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getMotorcycleSoldData = async (queryKey) => {
  const { startDate, virtualDealerArea } = queryKey?.queryKey[1]
  try {
    const data = baseApi.get(`/visualisation/get-motorcycle-sold-data`, {
      params: {
        startDate,
        virtualDealerArea,
      },
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getBookingManagementData = async (queryKey) => {
  const { startDate, virtualDealerArea } = queryKey?.queryKey[1]
  try {
    const data = baseApi.get(`/visualisation/get-booking-management-data`, {
      params: {
        startDate,
        virtualDealerArea,
      },
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getRequestManagementData = async (queryKey) => {
  const { startDate, virtualDealerArea } = queryKey?.queryKey[1]
  try {
    const data = baseApi.get(`/visualisation/get-request-management-data`, {
      params: {
        startDate,
        virtualDealerArea,
      },
    })

    return data
  } catch (error) {
    console.log(error)
  }
}
