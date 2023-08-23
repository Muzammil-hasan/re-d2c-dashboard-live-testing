import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getHSRPOnServer } from "../base-requests"
import { columns } from "./columns"
import { getHSRPInProcess } from "./requests"

export default async function InProcessHsrp(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { hsrpCount, hsrpData } = await getHSRPOnServer({
    status: "PENDING",
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
          "Pending",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        initialData={hsrpData}
        queryFn={getHSRPInProcess}
        pageCount={Math.ceil(hsrpCount / 10)}
      />
    </div>
  )
}
