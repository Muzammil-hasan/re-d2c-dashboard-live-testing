import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getApplicantsOnServer } from "../base-requests"
import { columns } from "./columns"
import { getRejectedApplicants } from "./requests"

export default async function Rejected(props) {
  const { state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { applicantsCount, applicantsData } = await getApplicantsOnServer({
    status: "REJECT",
  })

  return (
    <div>
      <QueriesCount
        className="mt-0"
        title={`${applicantsCount} queries found`}
      />
      <DataTable
        columns={columns}
        queryKey={[
          "applicants",
          {
            status: "reject",
            state,
            city,
            dealership,
            model,
            startDate,
            endDate,
          },
        ]}
        initialData={applicantsData}
        applicantsCount={applicantsCount}
        queryFn={getRejectedApplicants}
        pageCount={Math.ceil(applicantsCount / 10)}
      />
    </div>
  )
}
