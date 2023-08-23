"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiOutlineEye,
} from "react-icons/ai"
import { HiOutlineDocumentDownload } from "react-icons/hi"
import { MdCancel } from "react-icons/md"

import { MyDialog } from "~/components/ui/dialog"
import { Input, Label } from "~/components/ui/input"

import styles from "./style.module.scss"
import UploadDocumentsModal from "./uploadDocumentsModal"

// TODO: Rename MyDialog to more appropriate name

const UploadDocuments = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.uploadDocumentStyle}>
      <div className={styles.flex}>
        <span>
          <HiOutlineDocumentDownload size={22} />
        </span>
        <Link href="/">Download all documents</Link>
      </div>
      <hr />
      <DocumentsForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <MyDialog
        className={styles.uploadModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <UploadDocumentsModal />
      </MyDialog>
    </div>
  )
}

function DocumentsForm({ isOpen, setIsOpen }) {
  return (
    <form className={styles.contactForm}>
      <div className="row">
        <div className="d-flex">
          <h5>Adhaar Card</h5>
          <span>
            <AiFillCheckCircle
              data-toggle="tooltip"
              data-placement="right"
              title="Verified"
              size={20}
              color="#52AE3D"
            />
          </span>
        </div>
        <div className="col col-md-6">
          <div controlId="uploadForm">
            <div className={`${styles.formControl}`}>
              <Label>Front Side of Adhaar Card</Label>
              <Input
                type="text"
                placeholder="Faraz-adhar-card.jpeg"
                value="Faraz-adhar-card.jpeg"
                className={styles.contactInput}
                isShowInputIcon={true}
                inputIcon={
                  <AiOutlineEye size={20} onClick={() => setIsOpen(true)} />
                }
              />
            </div>
          </div>
        </div>
        <div className="col col-md-6">
          <div controlId="uploadForm">
            <div className={`${styles.formControl}`}>
              <Label>Back Side of Adhaar Card</Label>
              <Input
                type="text"
                placeholder="Faraz-adhar-card.jpeg"
                value="Faraz-adhar-card.jpeg"
                className={styles.contactInput}
                isShowInputIcon={true}
                inputIcon={
                  <AiOutlineEye size={20} onClick={() => setIsOpen(true)} />
                }
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="d-flex">
          <h5>Pan Card</h5>
          <span>
            <AiFillCheckCircle
              data-toggle="tooltip"
              data-placement="right"
              title="Verified"
              size={20}
              color="#52AE3D"
            />
          </span>
        </div>
        <div className="col col-md-6">
          <div controlId="uploadForm">
            <div className={`${styles.formControl}`}>
              <Label>Front Side of Pan Card</Label>
              <Input
                type="text"
                placeholder="Faraz-pan-card.jpeg"
                value="Faraz-pan-carg.jpeg"
                className={styles.contactInput}
                isShowInputIcon={true}
                inputIcon={
                  <AiOutlineEye size={20} onClick={() => setIsOpen(true)} />
                }
              />
            </div>
          </div>
        </div>
        <div className="col col-md-6" />
      </div>
      <hr />
      <div className="row">
        <div className="d-flex">
          <h5>Address Proof</h5>
          <span>
            <AiFillExclamationCircle
              data-toggle="tooltip"
              data-placement="right"
              title="Pending for Verification"
              size={20}
              color="#DA881C"
            />
          </span>
        </div>
        <div className="col col-md-6">
          <div controlId="uploadForm">
            <div className={`${styles.formControl}`}>
              <Label>Passport</Label>
              <Input
                type="text"
                placeholder="Faraz-passport.jpeg"
                value="Faraz-passport.jpeg"
                className={styles.contactInput}
                isShowInputIcon={true}
                inputIcon={
                  <AiOutlineEye size={20} onClick={() => setIsOpen(true)} />
                }
              />
            </div>
          </div>
        </div>
        <div className="col col-md-6" />
      </div>
      <hr />
      <div className="row">
        <div className="d-flex">
          <h5>Ration Card</h5>
          <span>
            <MdCancel
              data-toggle="tooltip"
              data-placement="right"
              title="Rejected"
              size={20}
              color="#DA291C"
            />
          </span>
        </div>
        <div className="col col-md-6">
          <div controlId="uploadForm">
            <div className={`${styles.formControl}`}>
              <Label>Front Side of Ration Card</Label>
              <Input
                type="text"
                placeholder="Faraz-ration-card.jpeg"
                value="Faraz-ration-card.jpeg"
                className={styles.contactInput}
                isShowInputIcon={true}
                inputIcon={
                  <AiOutlineEye size={20} onClick={() => setIsOpen(true)} />
                }
              />
            </div>
          </div>
        </div>
        <div className="col col-md-6" />
      </div>
      <hr />
      <div className="row">
        <div className="d-flex">
          <h5>Customer Photograph</h5>
          <span>
            <AiFillExclamationCircle
              data-toggle="tooltip"
              data-placement="right"
              title="Re-uploaded"
              size={20}
              color="#3D90AE"
            />
          </span>
        </div>
        <div className="col col-md-6">
          <div controlId="uploadForm">
            <div className={`${styles.formControl}`}>
              <Label>Passport size Photograph</Label>
              <Input
                type="text"
                placeholder="Faraz-photograph.jpeg"
                value="Faraz-photograph.jpeg"
                className={styles.contactInput}
                isShowInputIcon={true}
                inputIcon={
                  <AiOutlineEye size={20} onClick={() => setIsOpen(true)} />
                }
              />
            </div>
          </div>
        </div>
        <div className="col col-md-6" />
      </div>
    </form>
  )
}

export default UploadDocuments
