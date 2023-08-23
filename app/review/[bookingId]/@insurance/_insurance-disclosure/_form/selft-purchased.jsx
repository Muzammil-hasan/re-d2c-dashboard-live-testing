"use client"

import { Fragment } from "react"
import { omit } from "lodash-es"
import { toast } from "react-hot-toast"
import { AiOutlineEye } from "react-icons/ai"
import { IoCopyOutline } from "react-icons/io5"
import { useMutation } from "react-query"

import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard"
import { Button } from "~/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { DecisionButtons } from "~/components/decision-button"
import { FileInput, Input } from "~/components/input"
import { Label } from "~/components/label"
import { useReviewStore } from "~/slices/review-store"

import { saveImageInCloud } from "../../../requests"
import styles from "./style.module.scss"

export function SelfPurchasedInput({ form }) {
  const { copy } = useCopyToClipboard()

  const { mutate, isLoading } = useMutation({
    mutationFn: (file) => saveImageInCloud(file),
    onSuccess: (data) => form.setValue("policyCoverFile", data.data),
    onError: (error) => console.log("onError", error),
  })

  const handleCopy = (name) => {
    const value = form.getValues(name)
    if (value) {
      copy(value)
      toast.success("Success! Value copied")
    } else toast.error("There is nothing to copy")
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) mutate(file)
  }

  const uploadedInvoice = form.getValues("policyCoverFile")
  const registerField = omit(form.register("policyCoverFile"), "onChange")
  const setPreviewState = useReviewStore((state) => state.setPreviewState)
  const togglePreview = useReviewStore((state) => state.togglePreview)

  const handlePreview = () => {
    togglePreview(true)
    setPreviewState({
      documentName: "policyCoverFile",
      files: [uploadedInvoice.path],
    })
  }

  return (
    <>
      <div className={styles.title}>Policy details</div>
      <div className={styles.inputs}>
        <FormField
          name="policyNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-100">
              <FormLabel muted>Policy number</FormLabel>
              <FormMessage />
              <FormControl>
                <div className={styles.copy_input}>
                  <Input {...field} rounded={true} muted />
                  <Button variant="icon" onClick={() => handleCopy(field.name)}>
                    <IoCopyOutline size={18} />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-100">
              <FormLabel muted>Insurance Amount</FormLabel>
              <FormMessage />
              <FormControl>
                <Input {...field} rounded={true} muted />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <Label className="mb-2" muted>
            Uploaded Policy
          </Label>
          <FileInput
            rounded={true}
            {...registerField}
            onChange={handleChange}
            disabled={isLoading || uploadedInvoice}
          >
            {uploadedInvoice ? (
              <Fragment>
                <span>
                  {form.getValues("policyCoverFile").name || "Policy_cover"}
                </span>
                <Button
                  type="button"
                  variant="icon"
                  onClick={handlePreview}
                  className={styles.preview_btn}
                >
                  <AiOutlineEye size={20} />
                </Button>
              </Fragment>
            ) : (
              <span>Click to upload</span>
            )}
          </FileInput>
        </div>
        <DecisionButtons className={styles.decisionBtn} />
      </div>
    </>
  )
}
