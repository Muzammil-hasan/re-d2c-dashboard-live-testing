"use client"

import { useState } from "react"
import { HiOutlineClock } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { RiFileDownloadLine } from "react-icons/ri"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Indicator } from "~/components/ui/indicator"
import { InputDropdown } from "~/components/ui/input-dropdown"
import { Input } from "~/components/input"
import statusData from "~/json/loan-statuses.json"

import styles from "../finance-disclosure.module.scss"

function FinanceInputs({ form, data: { disbursementDetails } }) {
  const [isEditable, setIsEditable] = useState(false)
  const showInputs = Boolean(disbursementDetails.disbursementLetter)

  return (
    <>
      <div className={styles.financeDetails}>
        <div className={styles.financeFlex}>
          <div className={styles.statusTitle}>
            <Indicator variant={"danger"} className={styles.title}>
              Loan status:
            </Indicator>
          </div>

          <div className={styles.dropdownCols}>
            <FormField
              name="loanStatus"
              control={form.control}
              render={({ field: { onChange, name } }) => (
                <FormItem className={styles.fullWidth}>
                  <FormMessage />
                  <FormControl>
                    <InputDropdown
                      name={name}
                      onChange={onChange}
                      data={statusData}
                      disabled={!isEditable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            variant="link"
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? "Update" : "Edit"}
          </Button>
        </div>
      </div>
      <div className={styles.financeDetails}>
        <div className={styles.title2}>Finance Details</div>
        <div className={`${styles.detailsFlex} align-items-end`}>
          <div className={`${styles.detailsCols} col-md-6`}>
            <div className={styles.detailsInput}>
              <FormField
                name="disbursementLetterUrl"
                control={form.control}
                render={({ field }) => (
                  <FormItem style={{ width: "100%" }}>
                    <div className={styles["message-wrapper"]}>
                      <FormLabel muted className={styles.formLabel}>
                        Disbursement Letter
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span className={styles.inputIcon}>
                <RiFileDownloadLine size={20} />
              </span>
              <div className={styles.rejectBtn}>
                <MdClose size={20} />
              </div>
            </div>
          </div>
          <div className={`${styles.detailsCols} col-md-6`}>
            {/* <FormField
              name="financier"
              control={form.control}
              render={({ field: { onChange, name } }) => (
                <FormItem
                  className={styles.fullWidth}
                  style={{ marginLeft: "10px" }}
                >
                  <FormMessage />
                  <FormControl>
                    <InputDropdown
                      name={name}
                      onChange={onChange}
                      data={financierList}
                    />
                  </FormControl>
                </FormItem>
              )} */}
          </div>
        </div>
      </div>

      <div className={styles.updateAmountMain}>
        {!showInputs && (
          <div className={styles.buttonSection}>
            <button type="button" className={styles.updateInfo}>
              <div className={styles.updateInfoIcon}>
                <HiOutlineClock size={60} />
              </div>
              <p>
                The disbursement letter pertaining to this account has not been
                uploaded by the user.
              </p>
            </button>
          </div>
        )}

        {showInputs && (
          <>
            <div className="row">
              <div className="col-md-6">
                <FormField
                  name="caseFileNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <div className={styles["message-wrapper"]}>
                        <FormLabel className={styles.formLabel}>
                          Case File No.
                        </FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input placeholder="Enter Case File No" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-md-6">
                <FormField
                  name="tenure"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <div className={styles["message-wrapper"]}>
                        <FormLabel className={styles.formLabel}>
                          Tenure (In Months)
                        </FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input placeholder="Enter Tenure" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className={styles.disbursalAmount}>
              <div className={styles.disbursalTitle}>Disbursal Amount</div>
              <div className={styles.disburseInput}>
                <FormField
                  name="loanAmount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <div className={styles["message-wrapper"]}>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input placeholder="Enter AMount" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <FormField
                name="isDisbursementCompleted"
                control={form.control}
                render={({ field }) => (
                  <FormItem className={styles.fullWidth}>
                    <FormMessage />
                    <div className="d-flex align-items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mx-2">
                        Disbursement completed
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export { FinanceInputs }
