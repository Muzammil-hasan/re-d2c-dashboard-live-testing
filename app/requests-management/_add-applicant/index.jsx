"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment, useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { GoChevronRight } from "react-icons/go"
import { useMutation, useQueryClient } from "react-query"

import { IoMdClose } from "react-icons/io"
import { Input, Textarea } from "~/components/input"
import { Button } from "~/components/ui/button"
import { MyDialog } from "~/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { InputDropdown } from "~/components/ui/input-dropdown"
import cities from "~/json/cities.json"
import ownershipStatuses from "~/json/ownership-statuses.json"
import states from "~/json/states.json"
import { baseApi } from "~/lib/axios"
import schema from "./schema"

import styles from "./add-applicant.module.scss"

export function AddApplicant() {
  let [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <Fragment>
      <Button size="snug_wide" onClick={open}>
        <AiOutlinePlusCircle size={15} />
        <span>Add Applicant</span>
      </Button>
      <MyDialog className={styles.dialog} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className={styles.dialog_head}>
          <h2 className={styles.dialog_title}>Add Applicant</h2>
          <Button size="icon" variant="none" onClick={close}>
            <IoMdClose size={25} />
          </Button>
        </div>
        <AddApplicantForm close={close} />
      </MyDialog>
    </Fragment>
  )
}

function AddApplicantForm({ close }) {
  const queryClient = useQueryClient()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ownershipStatus: ownershipStatuses[0].value,
      address: {
        state: states[0].value,
        city: cities[0].value,
      },
      virtualDealer: {
        area: "Patna",
        email: "virtualDealer@gmail.com",
        callingCode: "+91",
        mobile: "9856859875",
      },
      source: "Admin Portal",
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => baseApi.post("/applicant/register", data),
    onSuccess: ({ data }) => {
      console.log("🚀 ~ file: index.jsx:78 ~ AddApplicantForm ~ data:", data)
      if (!data.success) return alert(data.message)
      queryClient.invalidateQueries({
        queryKey: ["applicants", { status: "pending" }],
      })
      form.reset()
      close()
    },
    onError: ({ response }) => {
      alert(response.data.message)
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className={styles.dialog_form}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Name</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="contactDetails.email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Email Address</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="fathersName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Fathers Name</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="ownershipStatus"
          control={form.control}
          render={({ field: { onChange, name } }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Ownership Status</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <InputDropdown
                  name={name}
                  onChange={onChange}
                  data={ownershipStatuses}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="contactDetails.mobile"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Phone Number</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input type={"phone"} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="address.city"
          control={form.control}
          render={({ field: { onChange, name } }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Select Virtual Dealer</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <InputDropdown name={name} data={states} onChange={onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="address.state"
          control={form.control}
          render={({ field: { onChange, name } }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>State</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <InputDropdown name={name} data={states} onChange={onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="address.city"
          control={form.control}
          render={({ field: { onChange, name } }) => (
            <FormItem>
              <div className={styles["message-wrapper"]}>
                <FormLabel>City</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <InputDropdown name={name} data={cities} onChange={onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="address.detail"
          control={form.control}
          render={({ field }) => (
            <FormItem className={styles.fullWidth}>
              <div className={styles["message-wrapper"]}>
                <FormLabel>Address</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          size="wide"
          type="submit"
          variant="accent"
          disabled={isLoading}
          className={styles["dialog_form__submit-btn"]}
        >
          <span>{isLoading ? "adding..." : "Add Application"}</span>
          <GoChevronRight strokeWidth={"0.1rem"} />
        </Button>
      </form>
    </Form>
  )
}
