import { getFinanceProfile } from "../requests"
import { FinanceDisclosure } from "./_finance-disclosure"

export default async function Finance({ params: { bookingId } }) {
  const initialData = await getFinanceProfile(bookingId)

  return <FinanceDisclosure initialData={initialData} guid={bookingId} />
}
