import { cn } from "~/lib/utils"

import styles from "./skeleton.module.scss"

function Skeleton({ className, ...props }) {
  return <div className={cn(styles.skeleton, className)} {...props} />
}

export { Skeleton }
