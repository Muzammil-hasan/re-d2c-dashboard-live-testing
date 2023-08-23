import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getDeliveryOnServer } from "../base-requests.js"
import { columns } from "./columns"
import { getDeliveryInProcess } from "./requests.js"

export default async function InProcess(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { deliveryCount, deliveryData } = await getDeliveryOnServer({
    status: "DISPATCHED",
  })

  return (
    <div>
      <div className="d-flex align-items-center">
        <QueriesCount
          className="mt-0"
          title={`${deliveryCount} queries found`}
        />
      </div>

      <DataTable
        columns={columns}
        queryKey={[
          "delivery",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        initialData={deliveryData}
        queryFn={getDeliveryInProcess}
        pageCount={Math.ceil(deliveryCount / 10)}
      />
    </div>
  )
}
