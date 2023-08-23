import axios from "axios"

import { baseApi } from "~/lib/axios"
import { formatFileSize } from "~/lib/utils"

export async function getProfile(guid, name) {
  try {
    const res = await baseApi(`${name}/get-${name}-profile?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getBookingProfile(guid) {
  try {
    const res = await baseApi(`/booking/get-booking-profile?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function saveBooking(data) {
  try {
    const res = await baseApi.put("/booking/save-booking", data)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function saveFinance(data) {
  try {
    const res = await baseApi.put("/finance/save-finance-details", data)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function savePayment(data) {
  try {
    const res = await baseApi.put("/payment/balance-payment", data)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getFinanceProfile(guid) {
  try {
    const res = await baseApi(`/finance/get-finance-profile?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getBalanceProfile(guid) {
  try {
    const res = await baseApi(`/payment/balance-details?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getDocuments(guid) {
  try {
    const res = await baseApi(`/documents?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}

// TODO: Create a one single function for fetching all the profiles
export async function saveImageInCloud(file) {
  const orderID = "8719-1313-92"
  const size = formatFileSize(file.size)
  const name = file.name.split(".")[0]
  const ext = file.name.split(".")[1]
  const fileData = { orderID, name, extension: ext }

  try {
    const { data } = await baseApi.post("/presigned/get-write-url", fileData)
    if (data.success) {
      const isCreated = await createImage(data.data.uploadURL, file)
      return {
        success: isCreated,
        data: { path: data.data.filePath, name, ext, size },
      }
    }
  } catch (error) {
    return error.response
  }
}

async function createImage(url, file) {
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = async () => {
    try {
      const response = await axios.put(url, reader.result, {
        headers: {
          "Content-Type":
            file.type === "application/pdf"
              ? "application/pdf"
              : `image/${file.type.split("/")[1]}`,
          "x-ms-blob-type": "BlockBlob",
        },
      })
      return response.status === 201
    } catch (error) {
      console.error("error", error)
    }
  }
}

export async function updateDocument(data) {
  try {
    const res = await baseApi.put(`/documents/update-status`, data)
    return res.data
  } catch (error) {
    return error.response
  }
}
export async function validateDocument(guid) {
  try {
    const res = await baseApi.put(`/documents/validate`, { guid })
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getInvoicedProfile(guid) {
  try {
    const res = await baseApi(`/invoice/invoice-details?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}
export async function saveInvoice(data) {
  try {
    const res = await baseApi.put(`/invoice/save-invoice`, data)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getInsuranceProfile(guid) {
  try {
    const res = await baseApi(`/insurance/insurance-details?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}
export async function saveInsurance(data) {
  try {
    const res = await baseApi.put(`/insurance/save-insurance`, data)
    return res.data
  } catch (error) {
    return error.response
  }
}
export async function saveDelivery(data) {
  try {
    const res = await baseApi.put("delivery/save-delivery", data)
    return res.data
  } catch (error) {
    return error.response
  }
}

export async function getDelivery(guid) {
  try {
    const res = await baseApi(`/delivery/delivery-details?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}
export async function insuranceMailTrigger(guid) {
  try {
    const res = await baseApi(`/insurance/self-insurance-mail?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}
export async function getFixationProfile(guid) {
  try {
    const res = await baseApi(`/fixation/get-fixation-profile?guid=${guid}`)
    return res.data
  } catch (error) {
    return error.response
  }
}
