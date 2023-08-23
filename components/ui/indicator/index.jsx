import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

import styles from "./indicator.module.scss"

const indicatorVariants = cva(styles.indicator, {
  variants: {
    variant: {
      success: styles.indicator_success,
      danger: styles.indicator_danger,
      warning: styles.indicator_warning,
    },
  },
  defaultVariants: { variant: "success" },
})

export const Indicator = ({ className, variant, children, ...props }) => {
  return (
    <div className={styles.wrapper} {...props}>
      <span className={cn(indicatorVariants({ variant }))} />
      <span className={className}>{children}</span>
    </div>
  )
}
