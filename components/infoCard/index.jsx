"use client"

import { useState } from "react"
import Link from "next/link"
import { BsDownload } from "react-icons/bs"
import { GoChevronRight } from "react-icons/go"
import { useMutation, useQueryClient } from "react-query"

import { Button } from "~/components/ui/button"
import { updateRefundProcessedStatus } from "~/app/cancelled-booking-details/[id]/request"

import { Checkbox } from "../ui/checkbox"
import styles from "./style.module.scss"

const InfoCard = (props) => {
  const [isRefundProcessed, setIsRefundProcessed] = useState(
    props.status === "COMPLETED"
  )

  const queryClient = useQueryClient()
  const mutation = useMutation((data) =>
    updateRefundProcessedStatus({
      guid: data.guid,
      cancelledBy: "ADMIN",
    })
  )

  async function handleCheckboxClick() {
    if (!isRefundProcessed) {
      await mutation.mutateAsync({ guid: props.guid })
      queryClient.invalidateQueries([
        "booking",
        { status: "BOOKING_CANCELLED" },
      ])
    }
  }

  // const queryClient = useQueryClient()
  // const mutation = useMutation(
  //   () =>
  //     updateRefundProcessedStatus({
  //       guid: props.guid,
  //       cancelledBy: "ADMIN",
  //     }),
  //   {
  //     onSuccess: () => {
  //       setIsRefundProcessed(true)
  //       queryClient.invalidateQueries(["cancelDetailData"])
  //     },
  //   }
  // )

  // function handleCheckboxClick() {
  //   if (!isRefundProcessed) {
  //     console.log("Checkbox clicked")
  //     mutation.mutate()
  //   }
  // }
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardHead}>
        <div className={styles.infoCardTopRow}>
          {props.id && props.idName && (
            <div className={styles.infoCardTopCol}>
              <h6> {props.id} :</h6> <span>{props.idName}</span>
            </div>
          )}

          <div className={`${styles.infoCardTopCol}`}>
            <div className={styles.statusMain}>
              <div
                className={`${styles.statusCircle} status-circle danger me-2 `}
              />
              <p>
                {props.statusTitle} : <span> {props.status}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.infoCardBottomRow}>
          <div className={styles.infoCardColums}>
            <div className={styles.infoCardBottomCol}>
              <div>
                <p>{props.title1}</p>
                <span>{props.subtitle1} </span>
              </div>

              <div>
                <p>{props.title2}</p>
                <span>{props.subtitle2}</span>
              </div>

              <div>
                <p>{props.title3}</p>
                <span>{props.subtitle3} </span>
              </div>

              <div>
                <p>{props.title4}</p>
                <span>{props.subtitle4}</span>
              </div>
            </div>
          </div>
          <div className={`${styles.mobileAlign} d-flex align-items-center`}>
            {props.refundProcess && (
              <div className={styles.refundProcess}>
                <Checkbox
                  customClass="d-flex align-items-center"
                  checkTitle="Refund Processed"
                  checked={isRefundProcessed}
                  onClick={handleCheckboxClick}
                  disabled={isRefundProcessed || mutation.isLoading}
                />
                <span className="mx-2">Refund Processed</span>
              </div>
            )}

            {props.downLoadIcon && (
              <div className={styles.DownloadIcon}>
                <BsDownload size={22} />
              </div>
            )}

            <div className={styles.viewDetailBtn}>
              {props.viewPrimaryBtn && (
                <Button variant="accent" size="small">
                  <Link
                    href={`/${
                      props.cancelledBooking
                        ? `cancelled-booking-details/${props.guid}`
                        : `review/${props.guid}`
                    }`}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <GoChevronRight size={22} />
                    <span>VIEW DETAILS</span>
                  </Link>
                </Button>
              )}

              {props.viewSecondaryBtn && (
                <div className={styles.secondaryBtnCustom}>
                  <Button>
                    <Link
                      href={`/query-details/${props.guid}`}
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    >
                      <span>VIEW DETAILS</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InfoCard
