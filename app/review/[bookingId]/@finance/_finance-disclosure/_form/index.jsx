"use client"

import { useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { RadioGroup } from "~/components/ui/radio-group"
import { useReviewStore } from "~/slices/review-store"

import { saveFinance } from "../../../requests"
import styles from "../finance-disclosure.module.scss"
import { FinanceInputs } from "./finance-inputs"
import { PaymentInputs } from "./payment-inputs"
import schema from "./schema"

const financeOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
]

function FinanceForm({ guid, data }) {
  const queryClient = useQueryClient()
  const setCurrentProfile = useReviewStore((state) => state.setCurrentProfile)

  const form = useForm({
    defaultValues: {
      guid,
      paymentLink: data.paymentLink,
      ...data.financeDetails,
    },
    resolver: zodResolver(schema),
  })

  const { mutate } = useMutation({
    mutationFn: saveFinance,
    onSuccess: ({ data, success }) => {
      if (!success) return toast.error("Something went wrong")
      toast.success("Finance details saved successfully")
      queryClient.invalidateQueries(["booking", "payment", guid])
      setCurrentProfile(data.status)
    },
    onError: (error) => {
      console.log("error", error)
      toast.error("Something went wrong")
    },
  })

  const isRequired = useMemo(
    () => form.watch("isFinanceRequired"),
    [form.watch("isFinanceRequired")]
  )

  return (
    <Form {...form}>
      <form
        id="finance-form"
        onSubmit={form.handleSubmit((data) => mutate(data))}
      >
        <div className={styles.financeMain}>
          <div className={styles.formTitle}>
            Finance Required?
            <span>
              (This option can only be changed before the loan is disbursed)
            </span>
          </div>

          <div className={styles.financeFlex}>
            <div className={styles.radioCols}>
              <FormField
                name="isFinanceRequired"
                control={form.control}
                render={({ field: { onChange, name, ...field } }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <RadioGroup
                        name={name}
                        onChange={onChange}
                        data={financeOptions}
                        defaultValue={form.watch("isFinanceRequired")}
                        className={styles.radio_group}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isRequired ? (
            <FinanceInputs form={form} data={data.financeDetails} />
          ) : (
            <PaymentInputs form={form} data={data} />
          )}
        </div>
      </form>
    </Form>
  )
}

export { FinanceForm }
