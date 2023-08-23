import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getBookingsOnServer } from "../base-requests"
import { columns } from "./columns"
import { getFinanceBookings } from "./requests"

export default async function Finance(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { bookingsCount, bookingsData } = await getBookingsOnServer({
    status: "FINANCE_DISBURSEMENT",
  })

  return (
    <div>
      <QueriesCount className="mt-0" title={`${bookingsCount} queries found`} />
      <DataTable
        columns={columns}
        initialData={bookingsData}
        queryFn={getFinanceBookings}
        queryKey={[
          "bookings",
          "finance",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        pageCount={Math.ceil(bookingsCount / 10)}
      />
    </div>
  )
}
