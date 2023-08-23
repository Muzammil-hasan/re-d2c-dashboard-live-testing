import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RiTimeLine } from "react-icons/ri"
import { useMutation } from "react-query"

import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Indicator } from "~/components/ui/indicator"
import { Label } from "~/components/ui/input"
import OutlineDropdown from "~/components/ui/outline-dropdown"
import { DecisionButtons } from "~/components/decision-button"
import { Input, TimePicker } from "~/components/input"

import { saveDelivery } from "../../../requests"
import { DatePickerInput } from "./date-picker-Input"
import { DeliveryAddress } from "./delivery-address"
import schema from "./schema"
import styles from "./style.module.scss"

export function DeliveryForm({ guid, data }) {
  const form = useForm({
    defaultValues: { ...data.deliveryId },
    resolver: zodResolver(schema),
  })

  const { mutate } = useMutation({
    mutationFn: saveDelivery,
    onSuccess: ({ success, message }) => {
      if (!success) return toast.error("Something went wrong, Try again!")
      toast.success(message)
    },
  })

  const onSubmit = (data) => {
    const formattedData = {
      guid,
      ...data,
      expectedDate:
        typeof data.expectedDate === "object"
          ? format(new Date(data.expectedDate), "dd/MM/yyyy")
          : data.expectedDate,
      registrationDetails: {
        ...data.registrationDetails,
        date: format(new Date(data.registrationDetails.date), "dd/MM/yyyy"),
      },
    }
    mutate(formattedData)
  }

  return (
    <Form {...form}>
      <form id="delivery-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.deliveryMain}>
          <div className={styles.deliveryDetails}>
            <div className={styles.deliveryFlex}>
              <div className={styles.title}>
                <Indicator variant={"danger"}>Delivery Status:</Indicator>
              </div>
              <div className={styles.statusTag}>
                <OutlineDropdown placeholder="Select delivery status" />
              </div>
            </div>
          </div>
          <div className={styles.deliveryDetails}>
            <h5 className="title-medium">Expected Delivery Date & Time</h5>
            <div className={`${styles.detailsFlex} row align-items-end`}>
              <div className={`${styles.detailsCols} col-md-6`}>
                <DatePickerInput name={"expectedDate"} control={form.control} />
              </div>
              <div className="col-md-6">
                <TimePickerInput
                  setValue={form.setValue}
                  register={form.register}
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="title-medium">Requested Delivery Date & Time</h5>
            <div className={`${styles.bottomMD} row`}>
              <div className="col-md-6">
                <Input
                  disabled
                  type="text"
                  value={`${form.getValues("preferredDate")} | ${form.getValues(
                    "preferredTimeSlot"
                  )}`}
                />
              </div>
              <div className="col-md-3 d-flex align-items-center mt-3 mt-lg-0">
                <div className={styles.uploadCancelBtn}>
                  <DecisionButtons
                    isApproved={form.getValues("preferenceStatus")}
                    onApprove={() =>
                      form.setValue("preferenceStatus", "APPROVED")
                    }
                    onReject={() =>
                      form.setValue("preferenceStatus", "REJECTED")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <DeliveryAddress form={form} />
          <FormField
            name="isMotorcycleDelivered"
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
                    Motorcycle Delivered
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}

export function TimePickerInput({ setValue, register }) {
  return (
    <div className={`${styles.detailsCols}`}>
      <div className={styles.time_picker}>
        <TimePicker setValue={setValue} register={register("startTime")} />
        <span>-</span>
        <TimePicker setValue={setValue} register={register("endTime")} />
        <RiTimeLine size={20} />
      </div>
    </div>
  )
}
