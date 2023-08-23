import { zodResolver } from "@hookform/resolvers/zod"
import { omit } from "lodash-es"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { AiOutlineCloudUpload, AiOutlineEye } from "react-icons/ai"
import { IoCopyOutline } from "react-icons/io5"
import { useMutation } from "react-query"

import { FileInput, Input } from "~/components/input"
import { Label } from "~/components/label"
import { PreviewModal } from "~/components/preview-modal"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { useCopyToClipboard } from "~/hooks/use-copy-to-clipboard"
import { cn } from "~/lib/utils"
import { useReviewStore } from "~/slices/review-store"

import { saveImageInCloud, saveInvoice } from "../../../requests"
import schema from "./schema"

// Styles here
import styles from "./style.module.scss"

function InvoicedForm({ guid, data }) {
  const { copy } = useCopyToClipboard()

  const setPreviewState = useReviewStore((state) => state.setPreviewState)
  const togglePreview = useReviewStore((state) => state.togglePreview)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { guid, ...data.invoiceId, invoiceStatus: "PENDING" },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (file) => saveImageInCloud(file),
    onSuccess: ({ data }) => form.setValue("invoiceDoc", data),
    onError: (error) => console.log("onError", error),
  })

  const { mutate: saveInvoiceProfile } = useMutation({
    mutationFn: saveInvoice,
    onSuccess: ({ data }) => {
      if (!data.success) return toast.error("Something went wrong, try again!")
      toast.success(data.message)
      setCurrentProfile(data.data.status)
    },
    onError: (error) => console.log("onError", error),
  })

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) mutate(file)
  }

  const handleCopy = (name) => {
    copy(form.getValues(name))
    toast.success("Success! Value copied")
  }

  const isInvoiceUploaded = form.getValues("invoiceDoc")
  const registerField = omit(form.register("invoiceDoc"), "onChange")

  const handlePreview = () => {
    const path = form.getValues("invoiceDoc").path
    togglePreview(true)
    setPreviewState({ files: [path], documentName: "invoiceDoc" })
  }

  const handleDocumentStatus = ({ status, rejectionReason }) => {
    form.setValue("invoiceStatus", status)
    form.setValue("rejectionReason", rejectionReason)
    togglePreview(false)
    setPreviewState({ files: [], documentName: "" })
  }

  // TODO: Create inline error and label variant or inline class

  return (
    <Fragment>
      <Form {...form}>
        <form
          id="invoice-form"
          onSubmit={form.handleSubmit((data) => saveInvoiceProfile(data))}
        >
          <div className={styles.invoice}>
            <h6 className={styles.invoice_title}>Chassis Number</h6>

            <div className="col-md-6">
              <FormField
                name="chassisNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className={styles.fullWidth}>
                    <div className={styles["message-wrapper"]}>
                      <FormLabel muted>Enter Chassis Number</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <div className={styles.copy_input}>
                        <Input rounded={true} {...field} />
                        <Button
                          variant="icon"
                          onClick={() => handleCopy(field.name)}
                        >
                          <IoCopyOutline size={18} />
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-md-6"></div>
            <h6 className={`${styles.invoice_title} mt-4`}>Invoice</h6>
            <div className="row align-items-center">
              <div className="col-md-6 my-0">
                <FormField
                  name="invoiceNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <div className={styles["message-wrapper"]}>
                        <FormLabel muted>Enter invoice number</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input rounded={true} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-md-6 my-0">
                <div className={cn("mb-2", styles["message-wrapper"])}>
                  <Label muted>
                    Upload generated motorcycle&apos;s invoice
                  </Label>
                  {form.getFieldState("invoiceDoc").invalid && (
                    <FormMessage>
                      {form.formState.errors?.invoiceDoc.message}
                    </FormMessage>
                  )}
                </div>
                <FileInput
                  rounded={true}
                  {...registerField}
                  onChange={handleChange}
                  disabled={isLoading || isInvoiceUploaded}
                >
                  {isInvoiceUploaded ? (
                    <Fragment>
                      <span>{form.getValues("invoiceDoc").name}</span>
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
                    <div className="upload-file-style">
                      <AiOutlineCloudUpload color="var(--accent)" size={20} />
                      <span>Click to upload</span>
                    </div>
                  )}
                </FileInput>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <PreviewModal onSubmit={handleDocumentStatus} />
    </Fragment>
  )
}

export { InvoicedForm }

// TODO: ADD icon always in file input
