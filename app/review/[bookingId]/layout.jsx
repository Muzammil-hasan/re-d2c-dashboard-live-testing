import ReviewLeftPanel from "~/components/bookings-management/reviewLeftPanel"
import TotalAmountCard from "~/components/bookings-management/totalAmountCard"

import { SaveBooking } from "./save-booking"
// Styles Here
import styles from "./styles.module.scss"

export default function ReviewLayout({ children, ...props }) {
  return (
    <div className={styles.bookingContainer}>
      <div>
        <ReviewLeftPanel />

        <div className={styles.forDesktop}>
          <TotalAmountCard />
        </div>
      </div>
      <ul className={styles.right_panel}>
        {children}
        {props.details}
        {props.finance}
        {props.payment}
        {props.documents}
        {props.invoiced}
        {props.insurance}
        {props.delivery}
        {props.hsrp}
        <SaveBooking />
      </ul>

      <div className={styles.forMobile}>
        <TotalAmountCard />
      </div>
    </div>
  )
}
