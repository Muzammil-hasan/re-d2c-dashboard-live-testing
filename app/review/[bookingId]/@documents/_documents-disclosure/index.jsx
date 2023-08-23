"use client"

import { Fragment } from "react"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { HiOutlineDocumentDownload } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"
import { useMutation } from "react-query"

import { PreviewModal } from "~/components/preview-modal"
import { useReviewStore } from "~/slices/review-store"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "../../_disclosure/disclosure"
import { updateDocument } from "../../requests"
import { DocumentsForm } from "./_form"
import styles from "./document-disclosure.module.scss"

export function DocumentsDisclosure({ guid, data }) {
  const togglePreview = useReviewStore((state) => state.togglePreview)
  const resetPreviewState = useReviewStore((state) => state.resetPreviewState)

  const { mutate } = useMutation({
    mutationFn: (data) => updateDocument({ guid, ...data }),
    onSuccess: ({ message, success }) => {
      if (!success) {
        toast.success("Oops something went wrong, Try again!")
      } else {
        toast.success(message)
        togglePreview(false)
        resetPreviewState()
      }
    },
  })

  return (
    <Disclosure>
      {({ open }) => (
        <Fragment>
          <DisclosureButton as="h2" open={open}>
            <span>Documents</span>
            <IoIosArrowDown />
          </DisclosureButton>
          <DisclosurePanel>
            <div className={styles.uploadDocumentStyle}>
              <div className={styles.flex}>
                <HiOutlineDocumentDownload size={22} />
                {/* TODO: Button not link and make link_underline variant */}
                <Link href="/">Download all documents</Link>
              </div>
              <hr />
              <DocumentsForm data={data} guid={guid} />
              <PreviewModal onSubmit={mutate} />
            </div>
          </DisclosurePanel>
        </Fragment>
      )}
    </Disclosure>
  )
}

// TODO: Rename MyDialog to more appropriate name
