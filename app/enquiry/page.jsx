import { Fragment } from "react"

import QueriesCount from "~/components/queriesCount"

import EnquiryCard from "./_enquiry-card"
import { getEnquiryOnServer } from "./base-requests"
import { getEnquiries } from "./request"

export default async function Enquiry(props) {
  const { searchTerm } = props.searchParams
  const { enquiryData, enquiryCount } = await getEnquiryOnServer({
    status: "",
  })

  return (
    <Fragment>
      <div className="mb-4">
        <QueriesCount
          className="mt-0"
          title={`${enquiryCount} results found`}
        />
      </div>
      <EnquiryCard
        queryKey={["enquiry", { status: "", searchTerm }]}
        initialData={enquiryData}
        queryFn={getEnquiries}
        pageCount={Math.ceil(enquiryCount / 10)}
      />
    </Fragment>
  )
}
