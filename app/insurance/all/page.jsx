import { Fragment } from "react"

import QueriesCount from "~/components/queriesCount"

import InsuranceCards from "../_insurance-cards"
import { getInsuranceOnServer } from "../base-requests"
import { getAllInsurance } from "./requests"

export default async function All(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { foundInsurance, documentCount } = await getInsuranceOnServer({
    status: "ALL",
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
        queryFn={getAllInsurance}
        initialData={foundInsurance}
        queryKey={[
          "insurance",
          {
            status: "ALL",
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
