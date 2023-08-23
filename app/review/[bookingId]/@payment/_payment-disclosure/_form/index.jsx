"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoIosArrowForward } from "react-icons/io"
import { useMutation } from "react-query"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/input"
import { useReviewStore } from "~/slices/review-store"

import { savePayment } from "../../../requests"
import schema from "./schema"
import styles from "./style.module.scss"

function PaymentForm({ data: { guid, transactionDetails } }) {
  const setCurrentProfile = useReviewStore((state) => state.setCurrentProfile)
  const form = useForm({
    defaultValues: { guid, ...transactionDetails },
    resolver: zodResolver(schema),
  })

  const { mutate } = useMutation({
    mutationFn: savePayment,
    onSuccess: ({ success }) => {
      if (!success) {
        toast.error("Something went wrong")
        return
      }
      toast.success("Payment saved successfully")
      // TODO: Pass status from data object
      setCurrentProfile("UPLOAD_DOCUMENT")
    },
    onError: (error) => {
      console.log("error", error)
      toast.error("Something went wrong")
    },
  })

  return (
    <Form {...form}>
      <form
        id="payment-form"
        className={styles.form}
        onSubmit={form.handleSubmit((data) => mutate(data))}
      >
        <h6 className={styles.form_title}>Amount Breakup</h6>
        <div className={styles.form_inputs}>
          <hr />
          <FormField
            name="motorcycleAmount"
            control={form.control}
            render={({ field: { value, ...field } }) => (
              <FormItem className={styles.inline}>
                <div>
                  <FormLabel>Motorcycle amount</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    disabled
                    {...field}
                    rounded={true}
                    value={value !== undefined ? `₹ ${value}` : "₹ "}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="bookingAmount"
            control={form.control}
            render={({ field: { value, ...field } }) => (
              <FormItem className={styles.inline}>
                <div>
                  <FormLabel>Booking Amount</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    disabled
                    {...field}
                    rounded={true}
                    value={value !== undefined ? `- ₹ ${value}` : "- ₹ "}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="financeDetails.loanAmount"
            control={form.control}
            render={({ field: { value, ...field } }) => (
              <FormItem className={styles.inline}>
                <div>
                  <FormLabel>Loan amount</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    disabled
                    {...field}
                    rounded={true}
                    value={value !== undefined ? `- ₹ ${value}` : "- ₹ "}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <hr className={styles.form_separator} />

          <FormField
            name="balancePayment"
            control={form.control}
            render={({ field: { value, ...field } }) => (
              <FormItem className={cn(styles.inline, styles.big)}>
                <div>
                  <FormLabel>Remaining Amount</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    rounded={true}
                    disabled={true}
                    value={value !== undefined ? `₹ ${value}` : "₹ "}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <hr className={styles.form_separator} />
        </div>

        <div className={styles.paymentLink_wrapper}>
          <FormField
            name="paymentLink"
            control={form.control}
            render={({ field }) => (
              <FormItem className={"flex-grow-1"}>
                <FormLabel>Payment Link</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input
                    {...field}
                    rounded={true}
                    placeholder="Add payment link"
                    disabled={form.watch("isPaymentCompleted")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="accent"
            disabled={form.watch("isPaymentCompleted")}
          >
            <span>SEND PAYMENT LINK</span>
            <IoIosArrowForward />
          </Button>
        </div>

        <FormField
          name="isPaymentCompleted"
          control={form.control}
          render={({ field }) => (
            <FormItem className={styles.fullWidth}>
              <FormMessage />
              <div className="d-flex align-items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="mx-3 fs-6">Payment completed</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export { PaymentForm }
