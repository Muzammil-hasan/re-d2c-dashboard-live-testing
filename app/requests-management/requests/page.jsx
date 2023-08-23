import SelectDataBtn from "~/components/ui/selectDataBtn"
import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getApplicantsOnServer } from "../base-requests"
import { columns } from "./columns"
import { getApplicants } from "./requests"

export default async function Request(props) {
  const { state, city, dealership, model, startDate, endDate } =
    props.searchParams

  const { applicantsCount, applicantsData } = await getApplicantsOnServer({
    status: "PENDING",
  })

  return (
    <div>
      <div className="action-header">
        <QueriesCount
          className="mt-0"
          title={`${applicantsCount} queries found`}
        />
        <SelectDataBtn />
      </div>

      <DataTable
        columns={columns}
        queryKey={[
          "applicants",
          {
            status: "pending",
            state,
            city,
            dealership,
            model,
            startDate,
            endDate,
          },
        ]}
        initialData={applicantsData}
        queryFn={getApplicants}
        pageCount={Math.ceil(applicantsCount / 10)}
      />
    </div>
  )
}
