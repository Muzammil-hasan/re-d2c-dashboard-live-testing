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
  FormMessage,
} from "~/components/ui/form"
import { RadioGroup } from "~/components/ui/radio-group"
import { Textarea } from "~/components/input"

import styles from "./reject-reason.module.scss"
import schema from "./schema"

const reasons = [
  {
    label: "Incomplete or non-compliant payment",
    value: "Incomplete or non-compliant payment",
  },
  {
    label: "Insufficient documentation or information provided",
    value: "Insufficient documentation or information provided",
  },
  { label: "Restricted delivery area", value: "Restricted delivery area" },
  {
    label: "Failure to meet eligibility criteria",
    value: "Failure to meet eligibility criteria",
  },
  {
    label: "Inadequate or non-responsive communication",
    value: "Inadequate or non-responsive communication",
  },
  { label: "Others", value: "Others" },
]

export function RejectReason({ open, setOpen, rows, status, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { reason: reasons[0].value },
  })

  return (
    <MyDialog
      isOpen={open}
      setIsOpen={setOpen}
      className={styles.reject_dialog}
    >
      <Fragment>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onSubmit({ rows, status, ...data })
            )}
            className={styles.form}
          >
            <FormField
              name="reason"
              control={form.control}
              render={({ field: { onChange, name } }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <RadioGroup
                      name={name}
                      data={reasons}
                      onChange={onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              style={{ width: "100%" }}
              name="description"
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
            <Button size="small" type="submit" variant="accent">
              <span>SUBMIT</span>
              <GoChevronRight size={30} />
            </Button>
          </form>
        </Form>
      </Fragment>
    </MyDialog>
  )
}
