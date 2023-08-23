"use client"

import { BsCheckLg } from "react-icons/bs"

import { cn } from "~/lib/utils"
import { useReviewStore } from "~/slices/review-store"

import styles from "./style.module.scss"

const ReviewLeftPanel = () => {
  const progressList = useReviewStore((state) => state.progressList)
  const { index } = useReviewStore((state) => state.currentProfile)

  return (
    <div className={styles.reviewLeftPanel}>
      <h1 className={styles.title}>Motorcycle Delivery Process</h1>
      <ul className={styles.reviewLeftPanelNav}>
        {progressList.slice(0, -2).map(({ label, done }, idx) => (
          <li
            key={idx}
            className={cn(
              index === idx && styles.active,
              done && styles.checked
            )}
          >
            <span className={styles.checkActive}>
              <BsCheckLg />
            </span>
            <p>{label}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ReviewLeftPanel
