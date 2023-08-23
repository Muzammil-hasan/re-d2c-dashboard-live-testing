import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getHSRPOnServer } from "../base-requests"
import { columns } from "./columns"
import { getCompletedHsrp } from "./requests"

export default async function Fixed(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { hsrpCount, hsrpData } = await getHSRPOnServer({
    status: "COMPLETED",
  })

  return (
    <div>
      <div className="d-flex align-items-center">
        <QueriesCount className="mt-0" title={`${hsrpCount} queries found`} />
      </div>

      <DataTable
        columns={columns}
        queryKey={[
          "HSRP",
          "Completed",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        initialData={hsrpData}
        queryFn={getCompletedHsrp}
        pageCount={Math.ceil(hsrpCount / 10)}
      />
    </div>
  )
}
