"use client"

import { IoIosArrowForward } from "react-icons/io"

import { Button } from "~/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/label"

import styles from "../finance-disclosure.module.scss"

function PaymentInputs({ form, data }) {
  const getBalanceAmount = () => {
    const { motorcycleAmount, bookingAmount, financeDetails } = data
    return motorcycleAmount - (bookingAmount - financeDetails.loanAmount)
  }

  return (
    <div className={styles.amountBreakup}>
      <div className={styles.title}>Amount Breakup</div>
      <span className={styles.separator} />

      <div className={styles.breakupFlex}>
        <div className={styles.breakupTitle}>Motorcycle Amount</div>
        <div className={styles.subtitle}>₹ {data.motorcycleAmount}</div>
      </div>

      <div className={styles.breakupFlex}>
        <div className={styles.breakupTitle}>Booking Amount</div>
        <div className={styles.subtitle}>- ₹ {data.bookingAmount}</div>
      </div>

      <div className={styles.breakupFlex}>
        <div className={styles.breakupTitle}>Loan Amount</div>
        <div className={styles.subtitle}>
          - ₹ {data.financeDetails.loanAmount}
        </div>
      </div>

      <span className={`${styles.separator} my-3 mt-2`} />
      <div className="row d-md-flex align-items-center">
        <div className="col-md-6">
          <Label className={styles.disbursalTitle}>
            Balance payment amount
          </Label>
        </div>
        <div className="col-md-6">
          <Input value={`₹ ${getBalanceAmount()}`} disabled rounded={true} />
        </div>
      </div>
      <span className={`${styles.separator} my-3`} />
      <div className="mt-4">
        <Label>Payment Link</Label>
        <div className={styles.paymentLink}>
          <FormField
            name="paymentLink"
            control={form.control}
            render={({ field }) => (
              <FormItem className={styles.fullWidth}>
                <FormMessage />
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="ml-3" type="submit" variant="accent">
            <span>SEND PAYMENT LINK</span>
            <IoIosArrowForward />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { PaymentInputs }
