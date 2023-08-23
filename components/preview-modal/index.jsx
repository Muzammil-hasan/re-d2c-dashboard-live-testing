"use client"

import { useState } from "react"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Fragment } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"

import { baseApi } from "~/lib/axios"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { RadioGroup } from "~/components/ui/radio-group"
import { Input } from "~/components/input"
import { useReviewStore } from "~/slices/review-store"

import { MyDialog } from "../ui/dialog"
import schema from "./schema"
import styles from "./style.module.scss"

const options = [
  { label: "Approve", value: "APPROVED" },
  { label: "Reject", value: "REJECTED" },
]

async function getPreviewURL(paths, index) {
  const res = await baseApi(`/presigned/get-read-url/?path=${paths[index]}`)
  return res.data.success ? res.data.data.readURL : ""
}

const PreviewModal = ({ onSubmit, approval = true }) => {
  const [index, setIndex] = useState(0)

  const { files, documentType } = useReviewStore((state) => state.previewState)
  const previewOpen = useReviewStore((state) => state.previewOpen)
  const togglePreview = useReviewStore((state) => state.togglePreview)

  const { data: url, isLoading } = useQuery({
    enabled: files.length > 0,
    refetchOnWindowFocus: false,
    queryKey: ["preview", index, files],
    queryFn: async () => await getPreviewURL(files, index),
  })

  return (
    <MyDialog
      isOpen={previewOpen}
      setIsOpen={togglePreview}
      className={styles.uploadModal}
    >
      <div className={styles.documentsModal}>
        <div className={styles.main}>
          <Carousel
            showArrows
            onChange={(index) => setIndex(index)}
            className={`${styles.carousel} modal-carousel`}
          >
            {files.map((source) => (
              <div key={source}>
                {isLoading ? (
                  <div className={styles.loader}>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <Fragment>
                    {documentType === "pdf" ? (
                      <DocumentPreview url={url} />
                    ) : (
                      <Image alt="alt" width={600} height={300} src={url} />
                    )}
                  </Fragment>
                )}
              </div>
            ))}
          </Carousel>

          {approval && <ApprovalForm onSubmit={onSubmit} />}
        </div>
      </div>
    </MyDialog>
  )
}

function ApprovalForm({ onSubmit }) {
  const { documentName } = useReviewStore((state) => state.previewState)
  const form = useForm({ resolver: zodResolver(schema) })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          onSubmit({ ...data, documentName })
        )}
      >
        <h5>Please review the above document and choose a response.</h5>
        <div className={styles.documentFlex}>
          <FormField
            name="status"
            control={form.control}
            render={({ field: { onChange, name, ...field } }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <RadioGroup
                    name={name}
                    data={options}
                    onChange={onChange}
                    className={styles.radio_group}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="rejectionReason"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-100">
              <div className={styles["message-wrapper"]}>
                <FormLabel>Reason for rejection</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  rounded
                  {...field}
                  disabled={form.watch("status") === "APPROVED"}
                  placeholder="Image uploaded is not very clear, please upload it again."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={styles.button}>
          <Button>Save</Button>
        </div>
      </form>
    </Form>
  )
}

function DocumentPreview({ url }) {
  // TODO: Implement a proper pdf viewer
  return <embed src={url} width={600} height={300} type="application/pdf" />
}
export { PreviewModal }
