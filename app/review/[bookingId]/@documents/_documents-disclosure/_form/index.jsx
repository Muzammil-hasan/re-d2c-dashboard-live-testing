"use client"

import { Fragment, useMemo } from "react"
import { omit } from "lodash-es"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiOutlineCloudUpload,
  AiOutlineEye,
} from "react-icons/ai"
import { MdCancel } from "react-icons/md"
import { useMutation } from "react-query"

import { Button } from "~/components/ui/button"
import { FileInput } from "~/components/input"
import { Label } from "~/components/label"
import { useReviewStore } from "~/slices/review-store"

import { validateDocument } from "../../../requests"
import styles from "../document-disclosure.module.scss"

export function DocumentsForm({ guid, data }) {
  const defaultValues = useMemo(() => ({ guid, ...data }), [data])

  const { mutate } = useMutation({
    mutationFn: validateDocument,
    onSuccess: ({ data }) => {
      if (data.uploadPending) {
        toast.error("Document(s) still pending, Can not update booking.")
      }
      console.log(data, "data")
    },
  })

  const form = useForm({ defaultValues })

  return (
    <form
      id="documents-form"
      className={styles.contactForm}
      onSubmit={form.handleSubmit(() => mutate(guid))}
    >
      <Document form={form} name="Adhaar Card" documentName="aadharCard" />
      <hr />
      <Document form={form} name="PAN Card" documentName="panCard" />
      <hr />
      <Document form={form} name="Address Proof" documentName="addressProof" />
      <hr />
      <Document form={form} name="Ration Card" documentName="rationCard" />
      <hr />
      <Document
        form={form}
        name="Customer Photograph"
        documentName="customerPhotograph"
      />
    </form>
  )
}

function Document({ form, name, documentName }) {
  const setPreviewState = useReviewStore((state) => state.setPreviewState)
  const togglePreview = useReviewStore((state) => state.togglePreview)

  const {
    status,
    backDocument,
    frontDocument,
    backDocumentRequired = false,
  } = useMemo(() => {
    const formValues = form.getValues(documentName)
    return formValues ? formValues : { status: "UPLOAD_PENDING" }
  }, [documentName])

  const handlePreview = () => {
    const paths = [frontDocument.path]
    if (backDocument && backDocument?.path) {
      paths.push(backDocument.path)
    }
    togglePreview(true)
    setPreviewState({ documentName, files: paths })
  }

  return (
    <div className="row">
      <div className="d-flex mb-2">
        <h5>{name}</h5>
        <Status status={status} />
      </div>
      <div className="col col-md-6">
        <DocumentInput
          setValue={form.setValue}
          getValues={form.getValues}
          handlePreview={handlePreview}
          register={form.register(`${documentName}.frontDocument`)}
        >
          Front Side of {name}
        </DocumentInput>
      </div>
      {backDocumentRequired && (
        <div className="col col-md-6">
          <DocumentInput
            setValue={form.setValue}
            getValues={form.getValues}
            handlePreview={handlePreview}
            register={form.register(`${documentName}.backDocument`)}
          >
            Back Side of {name}
          </DocumentInput>
        </div>
      )}
    </div>
  )
}

function DocumentInput({ children, register, getValues, handlePreview }) {
  const registerField = omit(register, "onChange")
  const savedFile = getValues(registerField.name)

  return (
    <div className={styles.documentInput}>
      <Label muted>{children}</Label>
      <FileInput
        rounded
        disabled={true}
        {...registerField}
        className={savedFile && styles.selected}
      >
        {savedFile ? (
          <Fragment>
            <span>{savedFile.name}</span>
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
          <Fragment>
            <div className="upload-file-style">
              <AiOutlineCloudUpload color="var(--accent)" size={20} />
              <span>Click to upload</span>
            </div>
          </Fragment>
        )}
      </FileInput>
    </div>
  )
}

const Status = ({ status }) => {
  const statusMap = {
    REJECTED: { icon: MdCancel, color: "accent" },
    APPROVED: { icon: AiFillCheckCircle, color: "success" },
    UPLOAD_PENDING: { icon: AiFillExclamationCircle, color: "warning" },
  }

  const { icon: Icon, color } = statusMap[status] || statusMap["UPLOAD_PENDING"]

  return (
    <span>
      {Icon && (
        <Icon
          size={20}
          title={status}
          data-toggle="tooltip"
          data-placement="right"
          color={`var(--${color})`}
        />
      )}
    </span>
  )
}
