"use client"

import { Fragment } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { GoChevronRight } from "react-icons/go"

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
import { Input } from "~/components/ui/input"
import { InputDropdown } from "~/components/ui/input-dropdown"

import styles from "./enquiry-creation.module.scss"
import schema from "./schema"

const dealers = [
  {
    id: 1,
    label: "Gurgaon",
    value: "Gurgaon",
  },
  {
    id: 2,
    label: "Delhi",
    value: "Delhi",
  },
]

const virtualDealer = {
  area: "Delhi NCR",
  email: "virtualDealerdelhincr@gmail.com",
  callingCode: "+91",
  mobile: "7777766692",
}

export function EnquiryCreation({ open, setOpen, guid, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { virtualDealer },
  })

  const handleClose = () => {
    setOpen(false)
    form.reset()
  }

  return (
    <MyDialog
      isOpen={open}
      setIsOpen={setOpen}
      className={styles.enquiry_dialog}
    >
      <Fragment>
        <div className={styles.title}>Enquiry Creation</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit({ guid, ...data }))}
            className={styles.dialog_form}
          >
            <FormField
              name="enquiryNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem className={`${styles.enquiry} ${styles.width}`}>
                  <div className={styles["field-wrapper"]}>
                    <FormLabel>MSD Enquiry Number</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="virtualDealer.area"
              control={form.control}
              render={({ field: { onChange, name } }) => (
                <FormItem className={`${styles.virtualDealer} ${styles.width}`}>
                  <div className={styles["field-wrapper"]}>
                    <FormLabel>Select Virtual Dealer</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <InputDropdown
                      name={name}
                      onChange={onChange}
                      data={dealers}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className={styles.flex}>
              <Button
                size="small"
                type="submit"
                variant="outline"
                onClick={handleClose}
                className={styles["submit-btn"]}
              >
                <span>Close</span>
              </Button>
              <Button size="small" type="submit" variant="accent">
                <span>CREATE</span>
                <GoChevronRight size={30} />
              </Button>
            </div>
          </form>
        </Form>
      </Fragment>
    </MyDialog>
  )
}
