import { getInsuranceProfile } from "../requests"
import { InsuranceDisclosure } from "./_insurance-disclosure"

export default async function Insurance({ params: { bookingId } }) {
  const { data: initialData } = await getInsuranceProfile(bookingId)

  return <InsuranceDisclosure guid={bookingId} data={initialData} />
}
