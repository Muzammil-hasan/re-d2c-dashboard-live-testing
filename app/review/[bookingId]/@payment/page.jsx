import { getBalanceProfile } from "../requests"
import { PaymentDisclosure } from "./_payment-disclosure"

export default async function BalancePayment({ params: { bookingId } }) {
  const initialData = await getBalanceProfile(bookingId)

  return <PaymentDisclosure initialData={initialData} guid={bookingId} />
}
