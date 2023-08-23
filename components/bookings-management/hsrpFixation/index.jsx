"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoIosArrowForward } from "react-icons/io"
import { useMutation } from "react-query"

import { baseApi } from "~/lib/axios"
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
import { TimePickerInput } from "~/app/review/[bookingId]/@delivery/_delivery-disclosure/_form"
import { DatePickerInput } from "~/app/review/[bookingId]/@delivery/_delivery-disclosure/_form/date-picker-Input"

import schema from "./schema"
import styles from "./style.module.scss"

const HSRPFixation = ({ guid, data }) => {
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { guid, ...data.fixationId },
  })

  const { mutate } = useMutation({
    mutationFn: (data) => baseApi.put("/fixation/save-fixation", data),
    onSuccess: ({ data, message }) => {
      if (!data.success) return toast.error(data.message)
      toast.success(data.message)
    },
    onError: ({ response }) => {
      toast.error(response.data.message)
    },
  })

  // TODO: create date picker global

  const onSubmit = ({ startTime, endTime, expectedDate, ...data }) => {
    const expectedTimeSlot = `${startTime}-${endTime}`
    mutate({
      guid,
      ...data,
      expectedTimeSlot,
      expectedDate:
        typeof expectedDate === "object"
          ? format(new Date(expectedDate), "dd/MM/yyyy")
          : expectedDate,
    })
  }

  return (
    <Form {...form}>
      <form id="fixation-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.hsrpDetails}>
          <div className={styles.hsrpFlex}>
            <div className={styles.headerTitle}>
              <span style={{ backgroundColor: "var(--accent)" }} /> HSRP
              Fixation Status:
            </div>
            <div className={styles.status}>{data.fixationId?.status}</div>
          </div>
          <h5 className="title-medium">Expected Fixation Date & Time</h5>
          <div className={`row ${styles.dateTimeFlex}`}>
            <div className="col col-md-6">
              <DatePickerInput control={form.control} name={"expectedDate"} />
            </div>
            <div className="col col-md-6">
              <FormField
                name="expectedTimeSlot"
                control={form.control}
                render={() => (
                  <FormItem className={"w-100 m-0"}>
                    <FormMessage />
                    <FormControl>
                      <TimePickerInput
                        setValue={form.setValue}
                        register={form.register}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={`mt-4 ${styles.title}`}>Fixation Address</div>
            <span onClick={() => setIsEdit((prev) => !prev)}>
              {!isEdit ? "Edit" : "Save"}
            </span>
          </div>
          <div className="row mt-3">
            <div className="col col-md-6">
              <div className={styles.title}>Name</div>
              {isEdit ? (
                <FormField
                  name="name"
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
              ) : (
                <div className={styles.content}>{form.getValues("name")}</div>
              )}
            </div>
            <div className="col col-md-6">
              <div className={styles.title}>Email Address</div>
              {isEdit ? (
                <FormField
                  name="email"
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
              ) : (
                <div className={styles.content}>{form.getValues("email")}</div>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className={styles.title}>Phone Number</div>
            {isEdit ? (
              <div className="col col-md-6">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <FormMessage />
                      <FormControl>
                        <Input type="phone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              // TODO: calling code is missing from backed
              <div className={styles.content}>
                {form.getValues("callingCode") || "+91"}{" "}
                {form.getValues("phone")}
              </div>
            )}
          </div>
          <div className="row mt-3">
            <div className={styles.title}>Address</div>
            <div className="col md-10">
              {isEdit ? (
                <FormField
                  name="address.detail"
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
              ) : (
                <div className={styles.content}>
                  {form.getValues("address.detail")}
                </div>
              )}
            </div>
            <div className="col col-md-2" />
          </div>
          <div className="row mt-4">
            <div className={`d-flex col col-md-6 ${styles.checkboxWrapper}`}>
              <FormField
                name="isFixationCompleted"
                control={form.control}
                render={({ field }) => (
                  <FormItem className={"w-100"}>
                    <FormMessage />
                    <div className="d-flex align-items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mx-3 fs-6">
                        Fixation Completed
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="col col-md-6">
              <div className={styles.updatebutton}>
                <Button type="submit" variant="accent" size="small">
                  <span>UPDATE DETAILS</span>
                  <IoIosArrowForward />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default HSRPFixation

// TODO: Redirect user if booking status is completed
