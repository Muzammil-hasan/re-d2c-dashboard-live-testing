import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getBookingsOnServer } from "../base-requests"
import { columns } from "./columns"
import { getBookings } from "./requests"

export default async function Bookings(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { bookingsCount, bookingsData } = await getBookingsOnServer({
    status: "MOTORCYCLE_BOOKED",
  })

  return (
    <div>
      <div className="d-flex align-items-center">
        <QueriesCount
          className="mt-0"
          title={`${bookingsCount} queries found`}
        />
      </div>

      <DataTable
        columns={columns}
        queryKey={[
          "bookings",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        initialData={bookingsData}
        queryFn={getBookings}
        pageCount={Math.ceil(bookingsCount / 10)}
      />
    </div>
  )
}
