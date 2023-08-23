import { getDelivery } from "../requests"
import { DeliveryDisclosure } from "./_delivery-disclosure"

export default async function Delivery({ params: { bookingId } }) {
  const { data: initialData } = await getDelivery(bookingId)

  return <DeliveryDisclosure guid={bookingId} data={initialData} />
}
