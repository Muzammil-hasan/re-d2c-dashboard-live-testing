import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IoIosArrowForward } from "react-icons/io"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

import schema from "./schema"
import styles from "./style.module.scss"

function BalancePayment({ guid }) {
  const [paymentSent, setPaymentSent] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const handleSendLink = () => {
    form.trigger()

    if (form.formState.isValid) {
      const formData = form.getValues()

      setPaymentSent(true) // For testing
    }
  }

  return (
    <Form {...form}>
      <form>
        <div className={styles.balancePayment}>
          <h6 className={styles.balancePaymentTitle}>Amount Breakup</h6>
          <hr />

          <div className={`${styles.balancePaymentData} col-md-12 m-0 my-2`}>
            <label
              for="inputEmail4"
              className={`${styles.inputLable} form-label col-md-6`}
            >
              Motorcycle Amount
            </label>
            <Input
              isShowRupeeIcon
              type="text"
              className={`${styles.balancePaymentInput} form-control col-md-6`}
              id="inputEmail4"
              placeholder="2,32,053"
            />
          </div>

          <div className={`${styles.balancePaymentData} col-md-12 m-0 my-2`}>
            <label
              for="inputEmail4"
              className={`${styles.inputLable} form-label col-md-6`}
            >
              Booking Amount
            </label>
            <Input
              isShowRupeeIcon
              type="text"
              className={`${styles.balancePaymentInput} form-control col-md-6`}
              id="inputEmail4"
              placeholder="- 10,000.00"
            />
          </div>
          <div className={`${styles.balancePaymentData} col-md-12 m-0 my-2`}>
            <label
              for="inputEmail4"
              className={`${styles.inputLable} form-label col-md-6`}
            >
              Loan Amount
            </label>
            <Input
              isShowRupeeIcon
              type="text"
              className={`${styles.balancePaymentInput} form-control col-md-6`}
              id="inputEmail4"
              placeholder="- 2,00,000.00"
            />
          </div>

          <hr className={styles.line} />
          <div className={`${styles.balancePaymentData} col-md-12 m-0 my-2`}>
            <label
              for="inputEmail4"
              className={`${styles.inputLable} ${styles.lableBold} form-label col-md-6`}
            >
              Remaining Amount
            </label>
            <Input
              isShowRupeeIcon
              type="text"
              className={`${styles.balancePaymentInput} ${styles.inputBold} form-control col-md-6`}
              id="inputEmail4"
              placeholder=" 22,053.00"
            />
          </div>
          <hr className={styles.line} />

          <div>
            <h6 className={styles.balancePaymentTitle}>Payment Link</h6>

            <div className={`${styles.balancePaymentData} flex-row col-md-12`}>
              <div className="col-md-8 col-12">
                <FormField
                  name="paymentLink"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.balancePaymentInput}>
                      <FormMessage />
                      <FormControl>
                        <Input
                          type="text"
                          className={`${styles.balancePaymentInput} ${styles.inputLink} form-control `}
                          id="inputEmail4"
                          placeholder="Add payment link"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className={`${styles.balancePaymentBtn} col-md-3`}>
                <Button variant="accent" type="button" onClick={handleSendLink}>
                  <span>SEND PAYMENT LINK</span>
                  <IoIosArrowForward />
                </Button>
              </div>
            </div>

            <div className="d-flex">
              <Checkbox checked={paymentSent} />
              <span className="mx-3">Payment completed</span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default BalancePayment
