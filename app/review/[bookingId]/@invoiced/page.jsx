import { getInvoicedProfile } from "../requests"
import { InvoicedDisclosure } from "./_invoiced-disclosure"

export default async function Invoiced({ params: { bookingId } }) {
  const { data: initialData } = await getInvoicedProfile(bookingId)

  return <InvoicedDisclosure guid={bookingId} data={initialData} />
}
