"use client"

import Image from "next/image"
import Link from "next/link"
import { BsFillCircleFill } from "react-icons/bs"
import { useQuery } from "react-query"

import { getBookingProfile } from "~/app/review/[bookingId]/requests"
import { useReviewStore } from "~/slices/review-store"

import styles from "./style.module.scss"

const MotorcycleDeliveryInfo = ({ data, guid }) => {
  const formId = useReviewStore((state) => state.formId)
  const { data: profile } = useQuery({
    initialData: data,
    queryKey: ["profile", formId, guid],
    queryFn: () => getBookingProfile(guid),
  })

  const { motorcycleDetails, applicantDetails } = profile.data

  return (
    <div
      className={styles.motorcycleInfoMain}
      style={{
        display: profile.data.status === "MOTORCYCLE_BOOKED" ? "none" : "block",
      }}
    >
      <div className={styles.motorcycleInfoFlex}>
        <div className="d-flex">
          <div className={styles.motorcycleInfoImg}>
            <Image
              src="/d2c/admin/images/re-hunter.jpg"
              width="142"
              height="79"
              alt="not found"
            />
          </div>
        </div>
        <div className={styles.motorcycleInfo}>
          <div className={styles.titleSection}>
            <div className={styles.modelTitle}> {motorcycleDetails?.model}</div>
            {motorcycleDetails?.engineCapacity && (
              <span className={styles.subStyle}>
                {motorcycleDetails?.engineCapacity}
              </span>
            )}
            <div className={styles.orderID}>
              <BsFillCircleFill className={styles.dotStyle} />
              Order ID: {profile?.data?.orderId}
            </div>
          </div>
          <div className={styles.detailColsFlex}>
            <div className={styles.detailCols}>
              <div className={styles.detailItem}>
                <div className={styles.detailTitle}>Name</div>
                <div className={styles.detailSbTitle}>
                  {applicantDetails?.name}
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailTitle}>Email</div>
                <div className={styles.detailSbTitle}>
                  {applicantDetails.contactDetails?.email || "-"}
                </div>
              </div>
            </div>
            <div className={styles.detailCols}>
              <div className={styles.detailItem}>
                <div className={styles.detailTitle}>Mobile</div>
                <div className={styles.detailSbTitle}>
                  <Link href="tel:9865854756">
                    {applicantDetails.contactDetails?.callingCode}{" "}
                    {applicantDetails.contactDetails?.mobile}
                  </Link>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailTitle}>Ownership Status</div>
                <div className={styles.detailSbTitle}>
                  {applicantDetails?.ownershipStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MotorcycleDeliveryInfo }
