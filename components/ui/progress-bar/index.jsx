import React from "react"
import * as Progress from "@radix-ui/react-progress"

import styles from "./progress-bar.module.scss"

const ProgressBar = () => {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Progress.Root className={styles.progressRoot} value={progress}>
      <Progress.Indicator
        className={styles.progressIndicator}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}

export default ProgressBar
