import { getBookingProfile } from "../requests"
import { DetailsDisclosure } from "./_details-disclosure"

export default async function BookingDetails({ params }) {
  const initialData = await getBookingProfile(params.bookingId)

  return (
    <DetailsDisclosure
      initialData={initialData}
      guid={params.bookingId}
      status={initialData.data.status}
    />
  )
}
