import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import ProgressBar from "~/components/ui/progress-bar"

import schema from "./schema"
import styles from "./style.module.scss"

function Invoiced({ guid }) {
  const [upload, setUpload] = useState(true)

  const form = useForm({
    resolver: zodResolver(schema),
  })

  const handleSaveInvoice = async () => {
    form.trigger()
    if (form.formState.isValid) {
      const data = {
        chassisNumber: form.getValues("chassisNumber"),
        invoiceNumber: form.getValues("invoiceNumber"),
        invoiceDoc: {
          path: "node/assets/D2C/012345/invoice-1691138180131.png",
          name: "invoice",
          ext: "png",
          size: "5455 bytes",
        },
        status: "COMPLETED",
        invoiceStatus: "APPROVED",
        guid,
      }
      console.log("formData", data)
    }
  }
  const uploadImg = () => {
    setUpload(false)
  }

  return (
    <Form {...form}>
      <form>
        <div className={styles.invoice}>
          <h6 className={styles.invoiceTitle}>Chassis Number</h6>

          <div className="col-md-6">
            <label
              for="inputEmail4"
              className={`${styles.inputLable} form-label`}
            >
              Enter Chassis Number
            </label>
            <div>
              <FormField
                name="chassisNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem className={styles.fullWidth}>
                    <FormMessage />
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className={`${styles.invoiceInput} form-control`}
                        id="inputEmail4"
                        placeholder="1234567865543000"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="col-md-6"></div>
          <h6 className={`${styles.invoiceTitle} mt-4`}>Invoice</h6>
          <div className="row">
            <div className="col-md-6 my-0">
              <label
                for="inputPassword4"
                className={`${styles.inputLable} form-label`}
              >
                Enter Invoice Number
              </label>
              <div>
                <FormField
                  name="invoiceNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <FormMessage />
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className={`${styles.invoiceInput} form-control`}
                          id="inputEmail4"
                          placeholder="1234567865543000"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-md-6 my-0">
              <label
                for="inputAddress"
                className={`${styles.inputLable} form-label`}
              >
                Upload generated motorcycle’s invoice
              </label>
              {upload ? (
                <div className={styles.uploadInput}>
                  <Input
                    type="text"
                    className={`${styles.invoiceInput} form-control text-center`}
                    id="inputAddress"
                    placeholder="Click to upload"
                    onClick={uploadImg}
                  />
                  <span className={styles.inputUploadIcon}>
                    <AiOutlineCloudUpload className={styles.invoiceIcon} />
                  </span>
                </div>
              ) : (
                <>
                  <div className={`${styles.invoiceProgress} invoiceProgress`}>
                    <AiOutlineCloudUpload className={styles.invoiceIcon} />
                    <div className={styles.progressBar}>
                      <p>FileName.ext</p>
                      <ProgressBar className={styles.progress} />
                    </div>
                    <RxCross2 className={styles.invoiceCrossIcon} />
                  </div>
                </>
              )}
              <Button
                size="small"
                variant="accent"
                onClick={handleSaveInvoice}
                type="button"
                style={{ float: "right" }}
              >
                Save Invoice
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default Invoiced
