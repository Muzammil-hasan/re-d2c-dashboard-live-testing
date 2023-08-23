import { DataTable } from "~/components/data-table"
import QueriesCount from "~/components/queriesCount"

import { getBookingsOnServer } from "../base-requests"
import { columns } from "./columns"
import { getBalancePayment } from "./requests"

export default async function Payment(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { bookingsCount, bookingsData } = await getBookingsOnServer({
    status: "BALANCE_PAYMENT",
  })

  return (
    <div>
      <QueriesCount className="mt-0" title={`${bookingsCount} queries found`} />
      <DataTable
        columns={columns}
        initialData={bookingsData}
        queryFn={getBalancePayment}
        queryKey={[
          "bookings",
          "BALANCE_PAYMENT",
          { searchTerm, state, city, dealership, model, startDate, endDate },
        ]}
        pageCount={Math.ceil(bookingsCount / 10)}
      />
    </div>
  )
}
