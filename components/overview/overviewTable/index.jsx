import React from "react"
import { toInteger } from "lodash-es"
import { useQuery } from "react-query"

import { getBookingManagementData } from "~/app/requests"

// Styles
import styles from "./style.module.scss"

const OverviewTable = (props) => {
  const { startDate, virtualDealerArea } = props
  const { data } = useQuery({
    queryKey: ["booking-management", { startDate, virtualDealerArea }],
    queryFn: getBookingManagementData,
  })
  return (
    <table
      className={`${styles.dashboardTable} table table-even m-0 table-striped`}
    >
      <tbody>
        <tr>
          <th>Booking Management</th>
          <th>Open</th>
          <th>Cancelled</th>
        </tr>

        <tr>
          <td>Bookings</td>
          <td>
            {data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
              (item) => item.status === "BOOKING_COMPLETED"
            )?.count
              ? data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
                  (item) => item.status === "BOOKING_COMPLETED"
                )?.count
              : "-"}
          </td>
          <td>
            {data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
              (item) => item.status === "BOOKING_COMPLETED"
            )?.count
              ? data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
                  (item) => item.status === "BOOKING_COMPLETED"
                )?.count
              : "-"}
          </td>
        </tr>

        <tr>
          <td>Finance Required</td>
          <td>
            {
              data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
                (item) => item.status === "FINANCE_DISBURSEMENT"
              )?.count
            }
          </td>
          <td>
            {
              data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
                (item) => item.status === "FINANCE_DISBURSEMENT"
              )?.count
            }
          </td>
        </tr>

        <tr>
          <td>Balance Payment</td>
          <td>
            {data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
              (item) => item.status === "BALANCE_PAYMENT"
            )?.count
              ? data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
                  (item) => item.status === "BALANCE_PAYMENT"
                )?.count
              : "-"}
          </td>
          <td>
            {
              data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
                (item) => item.status === "BALANCE_PAYMENT"
              )?.count
            }
          </td>
        </tr>

        <tr>
          <td>Total</td>
          <td>
            {toInteger(
              data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
                (item) => item.status === "BOOKING_COMPLETED"
              )?.count
            ) +
              toInteger(
                data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
                  (item) => item.status === "FINANCE_DISBURSEMENT"
                )?.count
              ) +
              toInteger(
                data?.data?.data?.motorcycleBookedData[0]?.statusCounts.find(
                  (item) => item.status === "BALANCE_PAYMENT"
                )?.count
              )}
          </td>
          <td>
            {toInteger(
              data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
                (item) => item.status === "BOOKING_COMPLETED"
              )?.count
            ) +
              toInteger(
                data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
                  (item) => item.status === "FINANCE_DISBURSEMENT"
                )?.count
              ) +
              toInteger(
                data?.data?.data?.motorcycleCancelledData[0]?.statusCounts.find(
                  (item) => item.status === "BALANCE_PAYMENT"
                )?.count
              )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default OverviewTable
