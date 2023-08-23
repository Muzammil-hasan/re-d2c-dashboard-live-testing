import { Fragment } from "react"

import QueriesCount from "~/components/queriesCount"

import InsuranceCards from "../_insurance-cards"
import { getInsuranceOnServer } from "../base-requests"
import { getPendingInsurance } from "./requests"

export default async function Pending(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { foundInsurance, documentCount } = await getInsuranceOnServer({
    status: "PENDING",
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
        queryFn={getPendingInsurance}
        initialData={foundInsurance}
        queryKey={[
          "insurance",
          {
            status: "PENDING",
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
