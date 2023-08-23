"use client"

import { Fragment, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useMutation } from "react-query"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { RadioGroup } from "~/components/ui/radio-group"
import { PreviewModal } from "~/components/preview-modal"
import { useReviewStore } from "~/slices/review-store"

import { saveInsurance } from "../../../requests"
import { ReInputs } from "./re-inputs"
import schema from "./schema"
import { SelfPurchasedInput } from "./selft-purchased"
import styles from "./style.module.scss"

const insuranceOptions = [
  { label: "Self Purchased", value: "SELF_PURCHASED" },
  { label: "RE Facilitated", value: "RE_PURCHASED" },
]

function Insurance({ guid, data }) {
  const setCurrentProfile = useReviewStore((state) => state.setCurrentProfile)
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { guid, ...data.insuranceId },
  })

  const isSelfPurchased = useMemo(
    () => form.watch("insuranceType") === "SELF_PURCHASED",
    [form.watch("insuranceType")]
  )

  const { mutate } = useMutation({
    mutationFn: saveInsurance,
    onSuccess: ({ data, success }) => {
      if (!success) {
        return toast.error("Something went wrong.")
      }
      toast.success("Insurance saved!")
      setCurrentProfile(data.bookingId.status)
    },
  })

  return (
    <Fragment>
      <Form {...form}>
        <form
          id="insurance-form"
          onSubmit={form.handleSubmit((data) => mutate({ guid, ...data }))}
        >
          <div className={styles.insuranceMain}>
            <FormField
              name="insuranceType"
              control={form.control}
              render={({ field: { onChange, name, ...field } }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <RadioGroup
                      muted={true}
                      name={name}
                      onChange={onChange}
                      data={insuranceOptions}
                      defaultValue={form.getValues("insuranceType")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className={styles.insuranceForm}>
              {/* TODO: Better name for this component e.g. REPurchasedInputs */}
              {!isSelfPurchased && <ReInputs form={form} />}

              {isSelfPurchased && <SelfPurchasedInput form={form} />}
            </div>
          </div>
        </form>
      </Form>
      <PreviewModal approval={false} />
    </Fragment>
  )
}

export { Insurance }
