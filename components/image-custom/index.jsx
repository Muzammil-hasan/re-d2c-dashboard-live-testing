import { useEffect, useState } from "react"
import Image from "next/image"

import { cn } from "~/lib/utils"

import styles from "./image-custom.module.scss"

const defaultImage = "/images/default-thumbnail.webp"

const IMAGE_QUALITY = 80

const ImageCustom = ({ className, src, alt, ...props }) => {
  const [errorImage, setErrorImage] = useState(defaultImage)
  const imageSource = src || defaultImage

  useEffect(() => {
    setErrorImage(defaultImage)
  }, [errorImage, src])

  return (
    <Image
      src={imageSource}
      quality={IMAGE_QUALITY}
      onError={() => setErrorImage(defaultImage)}
      className={cn(styles.base, className)}
      alt={alt || "alt"}
      {...props}
    />
  )
}
export default ImageCustom
