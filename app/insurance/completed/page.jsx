import { Fragment } from "react"

import QueriesCount from "~/components/queriesCount"

import InsuranceCards from "../_insurance-cards"
import { getInsuranceOnServer } from "../base-requests"
import { getCompletedInsurance } from "./requests"

export default async function Completed(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { foundInsurance, documentCount } = await getInsuranceOnServer({
    status: "COMPLETED",
  })

  return (
    <Fragment>
      <div className="mb-4">
        <QueriesCount
          className="mt-0"
          title={`${documentCount} results found`}
        />
      </div>
      <InsuranceCards
        queryFn={getCompletedInsurance}
        initialData={foundInsurance}
        queryKey={[
          "insurance",
          {
            status: "COMPLETED",
            searchTerm,
            state,
            city,
            dealership,
            model,
            startDate,
            endDate,
          },
        ]}
        pageCount={Math.ceil(documentCount / 10)}
      />
    </Fragment>
  )
}
