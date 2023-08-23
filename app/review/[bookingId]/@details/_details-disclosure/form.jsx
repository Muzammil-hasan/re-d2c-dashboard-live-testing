import { useMemo } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"

import { cn } from "~/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input, Textarea } from "~/components/input"
import { Label } from "~/components/label"
import bikes from "~/json/bikes.json"
import statuses from "~/json/ownership-statuses.json"
import { useReviewStore } from "~/slices/review-store"

import { BikesDropdown } from "../_bikes-dropdown"
import { saveBooking } from "../../requests"
import styles from "./details-disclosure.module.scss"
import schema from "./schema"

// passing default values to missing keys and dropdown
const generateDefaultValues = (guid, data) => {
  const applicantDetails = {
    ...data.applicantDetails,
    source: "Google forms",
    ownershipStatus: statuses[0].value,
  }
  return { guid, ...data, applicantDetails }
}

const DetailsForm = ({ guid, data }) => {
  const queryClient = useQueryClient()
  const setCurrentProfile = useReviewStore((state) => state.setCurrentProfile)
  const setAmount = useReviewStore((state) => state.setAmount)

  const defaultValues = useMemo(
    () => generateDefaultValues(guid, data),
    [data, guid]
  )

  const form = useForm({ defaultValues, resolver: zodResolver(schema) })

  const { mutate } = useMutation({
    mutationFn: saveBooking,
    onSuccess: ({ data, message, success }) => {
      if (!success) toast.error("Something went wrong")
      toast.success(message)
      console.log("data", data)
      setAmount({
        motorcycleAmount: data.transactionDetails.motorcycleAmount,
        bookingAmount: data.transactionDetails.bookingAmount,
        paid: data.transactionDetails.balancePaid,
        loanAmount: data.transactionDetails.financeDetails.loanAmount,
      })
      setCurrentProfile(data.status)
      queryClient.invalidateQueries(["booking", "finance", guid])
    },
    onError: (error) => {
      console.log("error", error)
      toast.error("Something went wrong")
    },
  })

  const onSubmit = (data) => {
    mutate({ ...data, guid: defaultValues.guid })
  }

  return (
    <Form {...form}>
      <form id={"booking-form"} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.bookingDetailsBody}>
          <h3 className={styles.detailHeading}>Motorcycle Details</h3>

          {/* Motor cycle details inputs */}
          <MotorcycleDetails form={form} />

          {/* Total amount  inputs */}
          <TotalAmount form={form} />

          {/* Applicant  inputs */}
          <ApplicantDetails form={form} />
        </div>
      </form>
    </Form>
  )
}

function MotorcycleDetails({ form }) {
  return (
    <section className={styles.selectSection}>
      <div className={`${styles.profileBikeImg} mb-3 mb-lg-0 `}>
        <Image
          src="/d2c/admin/images/re-hunter.jpg"
          width="500"
          height="500"
          alt="not found"
        />
      </div>
      <FormField
        name="motorcycleDetails"
        control={form.control}
        render={({ field: { name, onChange } }) => (
          <FormItem className={styles.fullWidth}>
            <FormMessage />
            <FormControl>
              <BikesDropdown name={name} data={bikes} onChange={onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  )
}

function TotalAmount({ form }) {
  const handleCurrencyChange = (e, onChange) => {
    const inputValue = e.target.value
    onChange(inputValue.startsWith("₹ ") ? inputValue.substr(2) : inputValue)
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.detailHeading}>Total Amount</h3>
      <hr />

      <div className={styles.wrapper}>
        <Label muted>Motorcycle Amount (Excluding Insurance)</Label>
        <FormField
          name="transactionDetails.motorcycleAmount"
          control={form.control}
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input
                  value={value !== undefined ? `₹ ${value}` : "₹ "}
                  onChange={(e) => handleCurrencyChange(e, onChange)}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={styles.wrapper}>
        <Label muted>Booking Amount</Label>
        <FormField
          name="transactionDetails.bookingAmount"
          control={form.control}
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input
                  value={value !== undefined ? `₹ ${value}` : "₹ "}
                  onChange={(e) => handleCurrencyChange(e, onChange)}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <hr className="mt-4" />
    </section>
  )
}

function ApplicantDetails({ form }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.detailHeading}>Booking Details</h3>

      <div className={styles.headSec}>
        <p className={cn(styles.detailHeading, "m-0")}>Virtual Dealer</p>
        <h3 className={cn(styles.detailHeading, "m-0 fw-medium")}>Delhi NCR</h3>
      </div>

      <div className={styles.wrapper}>
        <Label muted>Booking ID</Label>
        <FormField
          name="orderId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={styles.wrapper}>
        <Label muted>Name</Label>
        <FormField
          name="applicantDetails.name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={styles.wrapper}>
        <Label muted>Father&apos;s Name</Label>
        <FormField
          name="applicantDetails.fathersName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={styles.wrapper}>
        <Label muted>Email</Label>
        <FormField
          name="applicantDetails.contactDetails.email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className={styles.wrapper}>
        <Label muted>Mobile</Label>
        <FormField
          name="applicantDetails.contactDetails.mobile"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Input type={"phone"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className={styles.wrapper}>
        <Label muted>Address</Label>
        <FormField
          name="applicantDetails.address.detail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormMessage />
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  )
}

export { DetailsForm }
