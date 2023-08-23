import { baseApi } from "~/lib/axios"

export const getInvoicedOnServer = async () => {
  const { data } = await baseApi(`/invoice/get-invoice`)

  const invoicedData = data.data.foundInvoice.map((item, index) => ({
    no: index + 1,
    ...item,
  }))

  return { invoicedData, invoicedCount: data.data.documentCount }
}
