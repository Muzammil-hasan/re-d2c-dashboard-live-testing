import { BsCurrencyRupee } from "react-icons/bs"
import { FiUploadCloud } from "react-icons/fi"

import { cn } from "~/lib/utils"

import styles from "./input.module.scss"

export const Field = ({ children, className, ...props }) => (
  <div className={cn(styles.field, className)} {...props}>
    {children}
  </div>
)

export const Label = ({ children, className, ...props }) => (
  <label className={cn(styles.label, className)} {...props}>
    {children}
  </label>
)

export const Input = ({
  className,
  register,
  type = "text",
  isShowInputIcon,
  inputIcon,
  isShowRupeeIcon,
  ...props
}) => {
  if (type == "file") {
    return (
      <div className={styles.uploadCustomStyle}>
        <form>
          <div className={`${styles.formGroup} form-group`}>
            <input
              type="file"
              class="form-control-file"
              id="exampleFormControlFile1"
            />
            <span>
              <FiUploadCloud size={18} /> Click to upload
            </span>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className={styles.flexInput}>
        {isShowRupeeIcon && (
          <div className={styles.rupeeIcon}>
            <BsCurrencyRupee />
          </div>
        )}
        <input
          type={type}
          className={cn(styles.input, className)}
          {...register}
          {...props}
        />
        {isShowInputIcon && (
          <div className={styles.inputIconBtn}>{inputIcon}</div>
        )}
      </div>
    )
  }
}
export const TextArea = ({
  register,
  rows = 2,
  className,
  disabled,
  ...props
}) => (
  <textarea
    disabled={disabled}
    rows={rows}
    className={cn(styles.textarea, className)}
    {...register}
    {...props}
  />
)

export const Error = ({ className, children }) => (
  <p className={cn(styles.error, className)}>{children}</p>
)
