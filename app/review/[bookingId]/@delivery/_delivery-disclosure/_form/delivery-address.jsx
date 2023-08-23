"use client"

import { Fragment, useState } from "react"
import Image from "next/image"
import { RiFileCopyLine } from "react-icons/ri"

import { cn } from "~/lib/utils"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input, Textarea } from "~/components/input"

import { DatePickerInput } from "./date-picker-Input"
import styles from "./style.module.scss"

export function DeliveryAddress({ form }) {
  const [canEdit, setEdit] = useState(false)

  return (
    <div className={styles.deliveryAddress}>
      <div className={styles.formStateBtn}>
        <div className={`mt-3 mr-3 ${styles.title2}`}>Delivery Address</div>
        <button role="presentation" onClick={() => setEdit((prev) => !prev)}>
          {!canEdit ? "Edit" : "Save"}
        </button>
      </div>
      <div className="row">
        <div className="col-md-6">
          {canEdit ? (
            <DeliveryInputs form={form} />
          ) : (
            <DeliveryDetail form={form} />
          )}
        </div>
        <DeliveryLocation />
        <div className={styles.deliveryDetails}>
          <div className={`${styles.detailsFlex}  row align-items-end`}>
            <span className={styles.title2}>Registration Details</span>
            <div
              md={6}
              className={`${styles.detailsCols} ${styles.bottomMD} col-md-6`}
            >
              <FormField
                name="registrationDetails.number"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-100">
                    <div className={styles["message-wrapper"]}>
                      <FormLabel>Registration Number</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input {...field} rounded />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div
              md={6}
              className={`${styles.detailsCols} ${styles.bottomMD} col-md-6`}
            >
              <DatePickerInput
                control={form.control}
                name={"registrationDetails.date"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeliveryDetail({ form }) {
  return (
    <Fragment>
      <div>
        <p className={cn(styles.titlePlaceholder, "opacity-75")}>Name</p>
        <p className={styles.titleInput}>{form.getValues("name") || "-"}</p>
      </div>
      <div>
        <p className={cn(styles.titlePlaceholder, "opacity-75")}>
          Email address
        </p>
        <p className={styles.titleInput}>
          {form.getValues("contactDetails.email") || "-"}
        </p>
      </div>
      <div>
        <p className={cn(styles.titlePlaceholder, "opacity-75")}>
          Phone Number
        </p>
        <p className={styles.titleInput}>
          {form.getValues("contactDetails.callingCode")}{" "}
          {form.getValues("contactDetails.mobile") || "-"}
        </p>
      </div>
      <div>
        <p className={cn(styles.titlePlaceholder, "opacity-75")}>Address</p>
        <p className={styles.titleInput}>
          {form.getValues("address.detail") || "-"}
        </p>
      </div>
      <div>
        <p className={cn(styles.titlePlaceholder, "opacity-75")}>
          Instructions
        </p>
        <p className={styles.titleInput}>
          <p className={styles.titleInput}>
            {form.getValues("instructions") || "-"}
          </p>
        </p>
      </div>
      <div>
        <p className={cn(styles.titlePlaceholder, "opacity-75")}>Any Request</p>
        <p className={styles.titleInput}>
          <p className={styles.titleInput}>
            {form.getValues("request") || "-"}
          </p>
        </p>
      </div>
    </Fragment>
  )
}

function DeliveryInputs({ form }) {
  return (
    <Fragment>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-100">
            <div className={styles["message-wrapper"]}>
              <FormLabel>Name</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Input {...field} rounded />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="contactDetails.email"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-100">
            <div className={styles["message-wrapper"]}>
              <FormLabel>Email Address</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Input {...field} rounded disabled />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="contactDetails.mobile"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-100">
            <div className={styles["message-wrapper"]}>
              <FormLabel>Phone Number</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Input type={"phone"} {...field} rounded />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="address.detail"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-100">
            <div className={styles["message-wrapper"]}>
              <FormLabel>Address</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Textarea {...field} rounded />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="instructions"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-100">
            <div className={styles["message-wrapper"]}>
              <FormLabel>Instructions</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Textarea {...field} rounded />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name="request"
        control={form.control}
        render={({ field }) => (
          <FormItem className="w-100">
            <div className={styles["message-wrapper"]}>
              <FormLabel>Any request</FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Textarea {...field} rounded />
            </FormControl>
          </FormItem>
        )}
      />
    </Fragment>
  )
}

function DeliveryLocation() {
  return (
    <div className="col-md-6">
      <div className="d-flex justify-content-end">
        <Image
          className={styles.mapImg}
          src="/d2c/admin/images/google-map.png"
          width="150"
          height="150"
          alt="not found"
        />
      </div>

      <div className={styles.linkCopy}>
        <RiFileCopyLine size={20} />
        <p className={styles.textCopy}>Copy Link</p>
      </div>
    </div>
  )
}
