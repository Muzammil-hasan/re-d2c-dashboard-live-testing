"use client"

import { omit } from "lodash-es"
import { Fragment } from "react"
import { useMutation } from "react-query"

import { AiOutlineCloudUpload } from "react-icons/ai"
import { FileInput, Input } from "~/components/input"
import { Label } from "~/components/label"
import { Checkbox } from "~/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { cn } from "~/lib/utils"

import { saveImageInCloud } from "../../../requests"

// Styles here
import styles from "./style.module.scss"

export function ReInputs({ form }) {
  const { mutate, isLoading } = useMutation({
    mutationFn: (file) => saveImageInCloud(file),
    onSuccess: (data) => form.setValue("policyCoverFile", data.data),
    onError: (error) => console.log("onError", error),
  })

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) mutate(file)
  }

  const isInvoiceUploaded = form.getValues("policyCoverFile")
  const registerField = omit(form.register("policyCoverFile"), "onChange")

  return (
    <Fragment>
      <div className={styles.title}>Payment Details</div>
      <div className="row">
        <div className="col-md-6">
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-100">
                <FormLabel muted>Add Insurance amount</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} rounded={true} muted />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="isPaymentSuccessful"
            control={form.control}
            render={({ field }) => (
              <FormItem className={cn(styles.fullWidth, "my-4")}>
                <FormMessage />
                <div className="d-flex align-items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="mx-3 fs-6">
                    Payment successful
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className={styles.title}>Policy details</div>
      <div className="row">
        <div className="col-md-6">
          <FormField
            name="policyNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-100">
                <FormLabel muted>Policy number</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input {...field} rounded={true} muted />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="col-md-6">
          <div>
            <Label className="mb-2" muted>
              Uploaded Policy
            </Label>
            <FileInput
              rounded={true}
              {...registerField}
              onChange={handleChange}
              disabled={isLoading || isInvoiceUploaded}
            >
              {isInvoiceUploaded ? (
                <span>
                  {form.getValues("policyCoverFile").name || "Policy_cover"}
                </span>
              ) : (
                <div className="upload-file-style">
                  <AiOutlineCloudUpload color="var(--accent)" size={20} />
                  <span>Click to upload</span>
                </div>
              )}
            </FileInput>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
