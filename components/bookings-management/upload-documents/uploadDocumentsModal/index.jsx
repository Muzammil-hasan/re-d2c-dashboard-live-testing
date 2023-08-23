"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md"
import { useQuery } from "react-query"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"

import { baseApi } from "~/lib/axios"
import { Button } from "~/components/ui/button"
import Radio from "~/components/ui/radio"

import styles from "./style.module.scss"

async function getPreviewURL(path) {
  const res = await baseApi(`/presigned/get-read-url/?path=${path}`)
  return res.data.success ? res.data.data.readURL : ""
}

const UploadDocumentsModal = ({ previewFiles }) => {
  const [path, setPath] = useState(previewFiles[0])
  const { data: url, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["preview", path],
    queryFn: async () => await getPreviewURL(path),
    enabled: !!path,
  })

  return (
    <div className={styles.documentsModal}>
      <div className={styles.main}>
        <Carousel
          showArrows
          onChange={(index) => setPath(previewFiles[index])}
          className={`${styles.carousel} modal-carousel`}
        >
          {previewFiles.map((source) => (
            <div key={source}>
              {isLoading ? (
                <div className={styles.loader}>
                  <span>Loading...</span>
                </div>
              ) : (
                <Image alt="alt" width={600} height={300} src={url} />
              )}
            </div>
          ))}
        </Carousel>

        <h5>Please review the above document and choose a response.</h5>
        <div className={styles.documentFlex}>
          <div className={styles.formCols}>
            <Radio
              className="custom-radio"
              type="radio"
              id="one"
              name="item"
              label="Approve"
              checked
            />
          </div>
          <div className={styles.formCols}>
            <Radio
              className="custom-radio"
              type="radio"
              id="two"
              name="item"
              label="Reject"
            />
          </div>
        </div>
        <h5>Reason for rejection</h5>
        <div className={styles.text}>
          <p>Image uploaded is not very clear, please upload it again.</p>
        </div>
        <div className={styles.link}>
          <MdOutlineKeyboardArrowLeft size={25} color="white" />
          <Link href="/" className={styles.previous}>
            View Previous
          </Link>
          <Link href="/" className={styles.next}>
            View Next
          </Link>
          <MdOutlineKeyboardArrowRight size={25} color="white" />
        </div>
        <div className={styles.button}>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default UploadDocumentsModal
