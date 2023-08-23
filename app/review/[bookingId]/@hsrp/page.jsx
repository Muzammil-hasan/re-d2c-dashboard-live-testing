import { getFixationProfile } from "../requests"
import { HsrpDisclosure } from "./_hsrp-disclosure"

export default async function Hsrp({ params: { bookingId } }) {
  const { data: initialData } = await getFixationProfile(bookingId)

  return <HsrpDisclosure guid={bookingId} data={initialData} />
}
