"use client"

import { useReviewStore } from "~/slices/review-store"

import styles from "./status-indicator.module.scss"

export const StatusIndicator = () => {
  const { label } = useReviewStore((state) => state.currentProfile)

  return <p className={styles.status}>{label}</p>
}
