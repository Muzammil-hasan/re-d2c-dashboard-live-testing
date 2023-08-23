import { Fragment } from "react"

import QueriesCount from "~/components/queriesCount"

import { getBookingsOnServer } from "../base-requests"
import CancelledCard from "./_cancelled-card"
import { getCancelledBookings } from "./requests"

export default async function Cancelled(props) {
  const { searchTerm, state, city, dealership, model, startDate, endDate } =
    props.searchParams
  const { bookingsCount, bookingsData } = await getBookingsOnServer({
    status: "BOOKING_CANCELLED",
  })

  return (
    <Fragment>
      <div className="d-flex align-items-center">
        <QueriesCount
          className="mt-0"
          title={`${bookingsCount} queries found`}
        />
      </div>
      <CancelledCard
        queryFn={getCancelledBookings}
        initialData={bookingsData}
        queryKey={[
          "bookings",
          {
            status: "BOOKING_CANCELLED",
            searchTerm,
            state,
            city,
            dealership,
            model,
            startDate,
            endDate,
          },
        ]}
        pageCount={Math.ceil(bookingsCount / 10)}
      />
    </Fragment>
  )
}
