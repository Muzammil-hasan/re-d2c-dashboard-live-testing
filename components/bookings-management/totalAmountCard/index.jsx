"use client"

import { useMemo } from "react"

import { useReviewStore } from "~/slices/review-store"

import styles from "./style.module.scss"

function TotalAmountCard() {
  const { motorcycleAmount, bookingAmount, loanAmount, paid } = useReviewStore(
    (state) => state.amount
  )
  const currentProfile = useReviewStore((state) => state.currentProfile)

  const remainingAmount = useMemo(() => {
    const numericMotorcycleAmount = Number(motorcycleAmount)
    const numericBookingAmount = Number(bookingAmount)
    const numericLoanAmount = Number(loanAmount)
    const numericPaid = Number(paid)

    return (
      numericMotorcycleAmount -
      numericBookingAmount -
      numericLoanAmount -
      numericPaid
    )
  }, [motorcycleAmount, bookingAmount, loanAmount, paid])

  console.log(motorcycleAmount, bookingAmount, loanAmount, paid)

  return (
    <div
      className={styles.totalContainer}
      style={{ display: currentProfile.index === 0 ? "none" : "block" }}
    >
      <div className={styles.totalAmount}>
        <h6 className={styles.totalAmountTitle}>Total Amount</h6>
        <hr />
        <div className={styles.itemStyle}>
          <p className={`${styles.amountText} ${styles.textLight}`}>
            Motorcycle Amount
          </p>
          <p className={`${styles.amountText} ${styles.textDark}`}>
            ₹ {motorcycleAmount}
          </p>
        </div>
        <div className={styles.itemStyle}>
          <p className={`${styles.amountText} ${styles.textLight}`}>
            Booking Amount
          </p>
          <p className={`${styles.amountText} ${styles.textDark}`}>
            - ₹ {bookingAmount}
          </p>
        </div>
        <div className={styles.itemStyle}>
          <p className={`${styles.amountText} ${styles.textLight}`}>
            Loan Amount
          </p>
          <p className={`${styles.amountText} ${styles.textDark}`}>
            - ₹ {loanAmount}
          </p>
        </div>
        <div className={styles.itemStyle}>
          <p className={`${styles.amountText} ${styles.textLight}`}>
            Balance Paid
          </p>
          <p className={`${styles.amountText} ${styles.textDark}`}>
            - ₹ {paid}
          </p>
        </div>
        <hr />
        <div className={styles.itemStyle}>
          <p className={`${styles.amountText} ${styles.textLight}`}>Balance</p>
          <p className={`${styles.amountText} ${styles.textDark}`}>
            ₹ {remainingAmount}
          </p>
        </div>
        <hr />
        <div className={styles.itemStyle}>
          <p className={`${styles.amountText} ${styles.textLight}`}>
            Insurance <span> (Pending)</span>
          </p>
          <p className={`${styles.amountText} ${styles.textDark}`}>₹ 00.00</p>
        </div>
      </div>
      <div className={styles.noteStyle}>
        Note: Motorcycle Amount excludes Insurance
      </div>
    </div>
  )
}

export default TotalAmountCard
