import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getApplicantsOnServer } from "../base-requests"
import { columns } from "./columns"
import { getApprovedApplicants } from "./requests"

export default async function Approved(props) {
  const { state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { applicantsCount, applicantsData } = await getApplicantsOnServer({
    status: "APPROVED",
  })

  return (
    <div>
      <QueriesCount
        className="mt-0"
        title={`${applicantsCount} queries found`}
      />
      <DataTable
        columns={columns}
        initialData={applicantsData}
        queryFn={getApprovedApplicants}
        queryKey={[
          "applicants",
          {
            status: "approved",
            state,
            city,
            dealership,
            model,
            startDate,
            endDate,
          },
        ]}
        pageCount={Math.ceil(applicantsCount / 10)}
      />
    </div>
  )
}
