"use client"

import { IoIosArrowForward } from "react-icons/io"

import { Button } from "~/components/ui/button"
import { useReviewStore } from "~/slices/review-store"

import styles from "./styles.module.scss"

function SaveBooking() {
  const formId = useReviewStore((state) => state.formId)

  return (
    <div className={styles.fixedFooter}>
      <div className="mx-3">
        <Button>BACK</Button>
      </div>

      <div>
        <Button form={formId} type="submit" variant="accent">
          <span>SAVE</span>
          <IoIosArrowForward />
        </Button>
      </div>
    </div>
  )
}

export { SaveBooking }
