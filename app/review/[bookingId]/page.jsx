import { Fragment } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { BsChevronLeft } from "react-icons/bs"

import { Button } from "~/components/ui/button"
import { Indicator } from "~/components/ui/indicator"
import { MotorcycleDeliveryInfo } from "~/components/bookings-management/motorcycleDeliveryInfo"
import { StatusIndicator } from "~/components/status-indicator"

import { getBookingProfile } from "./requests"
import styles from "./styles.module.scss"

export default async function Review({ params }) {
  const profile = await getBookingProfile(params.bookingId)

  if (!profile.success) {
    redirect("/booking-management/bookings")
  }

  if (profile.data.status === "BOOKING_CANCELLED") {
    redirect(`/cancelled-booking-details/${profile.data.guid}`)
  }

  return (
    <Fragment>
      <div className={`${styles.header} ${styles.backBtnStyle}`}>
        <Button variant="link" asChild>
          <Link href={"/booking-management/bookings"}>
            <BsChevronLeft size={15} />
            <span>Go Back</span>
          </Link>
        </Button>

        <div className={styles.status_bar}>
          <Indicator variant={"danger"} className={styles.indicator}>
            Status:
          </Indicator>
          <StatusIndicator />
        </div>
      </div>
      <MotorcycleDeliveryInfo data={profile} guid={params.bookingId} />
    </Fragment>
  )
}
