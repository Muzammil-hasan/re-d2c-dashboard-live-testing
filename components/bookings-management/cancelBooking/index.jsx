"use client"

import Image from "next/image"
import Link from "next/link"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { BsChevronLeft } from "react-icons/bs"
import { useMutation, useQueryClient } from "react-query"

import { formatTimestamp } from "~/lib/utils"
import { Checkbox } from "~/components/ui/checkbox"
import { updateRefundProcessedStatus } from "~/app/cancelled-booking-details/[id]/request"

// Styles
import styles from "./style.module.scss"

function CancelBooking({ cancelledDetails }) {
  const isRefundProcessed =
    cancelledDetails.cancellationDetails.status === "COMPLETED"
  const queryClient = useQueryClient()
  const mutation = useMutation((data) =>
    updateRefundProcessedStatus({
      guid: data.guid,
      cancelledBy: "ADMIN",
    })
  )

  async function handleCheckboxClick() {
    if (!isRefundProcessed) {
      await mutation.mutateAsync({ guid: cancelledDetails.guid })
      queryClient.invalidateQueries([
        "CancelledBookingData",
        cancelledDetails.guid,
      ])
    }
  }

  console.log("child", cancelledDetails)
  return (
    <>
      <div className={styles.headerStyle}>
        <div className={styles.leftSec}>
          <Link href="/booking-management/cancelled">
            <BsChevronLeft className="backBtnIcom" size={20} />
          </Link>
          <h3 className={styles.title3}>Cancel Booking</h3>
        </div>

        <div className={styles.status}>
          <div
            className={`${styles.statusCircle} status-circle danger me-2 `}
          />
          <p>
            Refund Status:{" "}
            <span>{cancelledDetails.cancellationDetails.status}</span>
          </p>
        </div>
      </div>
      <div className={styles.cancelBooking}>
        <div className={styles.motercycleDetails}>
          <h6 className={styles.cancelBookingTitle}>Motorcycle Details</h6>

          <div className={styles.motercycleDetailsContent}>
            <div className={styles.motercycleDetailsImg}>
              <Image
                src={cancelledDetails.motorcycleDetails?.imageUrl}
                width="250"
                height="150"
                alt="bike photo"
              />
            </div>
            <div className={styles.motercycleDetailsData}>
              <p className={styles.motercycleDetailsDataInfo}>
                <AiOutlineInfoCircle className={styles.infoIcon} /> The booking
                has been cancelled by the user
              </p>
              <h5 className={styles.motercycleDetailsDataTitle}>
                {cancelledDetails.motorcycleDetails?.model}{" "}
                <span>Dapper Grey</span>
              </h5>
              <div className="d-flex justify-content-between">
                <p
                  className={`${styles.cancelBookingText} ${styles.textLight}`}
                >
                  Variant
                </p>
                <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
                  {cancelledDetails?.motorcycleDetails?.variant}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p
                  className={`${styles.cancelBookingText} ${styles.textLight}`}
                >
                  Engine CC
                </p>
                <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
                  {cancelledDetails.motorcycleDetails?.engineCapacity}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p
                  className={`${styles.cancelBookingText} ${styles.textLight}`}
                >
                  Color
                </p>
                <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
                  {cancelledDetails.motorcycleDetails?.variant}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h6 className={styles.cancelBookingTitle}>Cancelation Details</h6>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Cancellation Reason
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.cancellationDetails.reason}
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Date and Time
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {formatTimestamp(cancelledDetails.cancellationDetails.date)}
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h6 className={styles.cancelBookingTitle}>Booking Details</h6>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Name
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.applicantDetails.name}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Father&apos;s Name
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.applicantDetails.fathersName}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Email
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.applicantDetails.contactDetails.email}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Mobile
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.applicantDetails.contactDetails.mobile}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Address
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.applicantDetails.address.detail},
              {cancelledDetails.applicantDetails.address.city},
              {cancelledDetails.applicantDetails.address.state}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Ownership Status
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              First Motorcycle
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h6 className={styles.cancelBookingTitle}>Refund Details</h6>
          <div className="d-flex justify-content-between">
            <p className={`${styles.cancelBookingText} ${styles.textLight}`}>
              Booking Amount
            </p>
            <p className={`${styles.cancelBookingText} ${styles.textDark}`}>
              {cancelledDetails.transactionDetails.bookingAmount}
            </p>
          </div>
        </div>
        <hr />
        <div className="d-flex">
          <Checkbox
            checked={isRefundProcessed}
            onClick={handleCheckboxClick}
            disabled={isRefundProcessed || mutation.isLoading}
          />
          <span className="mx-2">Refund Processed</span>
        </div>
      </div>
    </>
  )
}

export default CancelBooking
