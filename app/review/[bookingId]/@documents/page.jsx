import { getDocuments } from "../requests"
import { DocumentsDisclosure } from "./_documents-disclosure"

// TODO: Data should post as get response

export default async function Documents({ params: { bookingId } }) {
  const { data: initialData } = await getDocuments(bookingId)

  return <DocumentsDisclosure guid={bookingId} data={initialData} />
}
