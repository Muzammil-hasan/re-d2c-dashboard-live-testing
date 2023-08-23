import { Fragment } from "react"

import QueriesCount from "~/components/queriesCount"

import InvoiceCard from "./_invoice-card"
import { getInvoicedOnServer } from "./base-requests"
import { getInvoiced } from "./requests"

export default async function Invoiced(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { invoicedCount, invoicedData } = await getInvoicedOnServer()

  return (
    <Fragment>
      <div className="mb-4">
        <QueriesCount
          className="mt-0"
          title={`${invoicedCount} results found`}
        />
      </div>
      <InvoiceCard
        queryFn={getInvoiced}
        initialData={invoicedData}
        queryKey={[
          "invoiced",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        pageCount={Math.ceil(invoicedCount / 10)}
      />
    </Fragment>
  )
}
