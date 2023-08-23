"use client"

import { Label } from "~/components/label"
import { useReviewStore } from "~/slices/review-store"

import styles from "./details-disclosure.module.scss"

export function SavedForm({ data, setIsDone, isDone }) {
  const setFormId = useReviewStore((state) => state.setFormId)

  const handleClick = () => {
    setIsDone(false)
    setFormId("booking-form")
  }

  return (
    <section className={`${styles.section} mt-0`}>
      <div className={styles.saveEditbtn}>
        <h4 className={styles.savedDetailHeading}>Booking Details</h4>
        <span onClick={handleClick}>{isDone ? "Edit" : "Save"}</span>
      </div>

      <hr />

      <div className={styles.wrapper}>
        <Label muted>Dealer</Label>

        <h4 className={`${styles.savedFormSpan}`}>
          {data.virtualDealer?.area}
        </h4>
      </div>

      <hr />

      <div className={`${styles.wrapper} mb-2`}>
        <Label className={styles.savedFormLabel} muted>
          Name
        </Label>

        <h5 className={`${styles.savedFormSpan}`}>
          {data?.applicantDetails?.name}
        </h5>
      </div>

      <div className={`${styles.wrapper} mb-2`}>
        <Label className={styles.savedFormLabel} muted>
          Father&apos;s Name
        </Label>

        <h4 className={`${styles.savedFormSpan}`}>
          {data?.applicantDetails?.fathersName}
        </h4>
      </div>

      <div className={`${styles.wrapper} mb-2`}>
        <Label className={styles.savedFormLabel} muted>
          Email
        </Label>

        <h4 className={`${styles.savedFormSpan}`}>
          {data?.applicantDetails?.contactDetails?.email}
        </h4>
      </div>

      <div className={`${styles.wrapper} mb-2`}>
        <Label className={styles.savedFormLabel} muted>
          Mobile
        </Label>

        <h4 className={`${styles.savedFormSpan}`}>
          {data?.applicantDetails?.contactDetails?.callingCode}{" "}
          {data?.applicantDetails?.contactDetails?.mobile}
        </h4>
      </div>

      <div className={`${styles.wrapper} mb-2`}>
        <Label className={styles.savedFormLabel} muted>
          Address
        </Label>

        <h4 className={`${styles.savedFormSpan}`}>
          {data?.applicantDetails?.address?.detail}
        </h4>
      </div>
      <div className={`${styles.wrapper} mb-2`}>
        <Label className={styles.savedFormLabel} muted>
          Ownership Status
        </Label>

        <h4 className={`${styles.savedFormSpan}`}>
          {data?.applicantDetails?.ownershipStatus}
        </h4>
      </div>
    </section>
  )
}
