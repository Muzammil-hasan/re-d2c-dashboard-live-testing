import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { HiOutlineClock } from "react-icons/hi"
import { IoIosArrowForward } from "react-icons/io"
import { MdClose } from "react-icons/md"
import { RiFileDownloadLine } from "react-icons/ri"
import { useMutation, useQueryClient } from "react-query"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { InputDropdown } from "~/components/ui/input-dropdown"
import Radio from "~/components/ui/radio"

// import { RadioGroup } from "~/components/ui/radio-group"

import schema from "./schema"
import styles from "./style.module.scss"

const statusData = [
  {
    id: 1,
    label: "Document Verification",
    value: "Document Verification",
  },
  {
    id: 2,
    label: "Under Process",
    value: "Under Process",
  },
  {
    id: 1,
    label: "Loan Approved",
    value: "Loan Approved",
  },
]

function Finance({ guid }) {
  const queryClient = useQueryClient()
  const [financeInfoShow, setFinanceInfoShow] = useState("yes")
  const [selected, setSelected] = useState("yes")
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      guid,
      isFinanceRequired: true,
      loanStatus: "",
      disbursementLetterUrl: "s3/image/disbursementLetterUrl",
      financier: "",
      caseFileNumber: "",
      tenure: "",
      isDisbursementCompleted: true,
      loanAmount: 0,
      paymentLink: "",
    },
  })

  const { mutate } = useMutation({
    mutationFn: (data) => baseApi.put("/booking/save-finance-details", data),
    onSuccess: ({ data }) => {
      console.log("🚀 data:", data)
      if (!data.success) return alert(data.message)
      queryClient.invalidateQueries({
        queryKey: ["finance"],
      })
      form.reset()
    },
    onError: ({ response }) => {
      alert(response.data.message)
    },
  })

  const handleClick = () => {
    console.log("Finance form>>", form)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutate(data))}>
        <div className={styles.financeMain}>
          <div className={styles.formTitle}>
            Finance Required?
            <span>
              (This option can only be changed before the loan is disbursed)
            </span>
          </div>

          <div className={styles.financeFlex}>
            <div className={styles.radioCols}>
              <FormField
                name="isFinanceRequired"
                control={form.control}
                render={({ field: { onChange, name } }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Radio label="Yes" name="radio1" id="yes" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={styles.radioCols}>
              <FormField
                name="isFinanceRequired"
                control={form.control}
                render={({ field: { onChange, name } }) => (
                  <FormItem>
                    <FormMessage />
                    <FormControl>
                      <Radio label="Yes" name="radio1" id="yes" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {selected === "yes" && (
            <>
              <div className={styles.financeDetails}>
                <div className={styles.financeFlex}>
                  <div className={styles.title}>
                    <span style={{ backgroundColor: "#DA291C" }} /> Loan status:
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
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Link href="/">Update</Link>
                </div>
              </div>
              <div className={styles.financeDetails}>
                <div className={styles.title2}>Finance Details</div>
                <div
                  className={`${styles.detailsFlex} align-items-end ${
                    financeInfoShow && styles.detailsInputDisabled
                  }`}
                >
                  <div className={`${styles.detailsCols} col-md-6`}>
                    <div className={styles.detailsInput}>
                      <FormField
                        name="disbursementLetterUrl"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem style={{ width: "97%" }}>
                            <div className={styles["message-wrapper"]}>
                              <FormLabel className={styles.formLabel}>
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
                      <div
                        className={styles.rejectBtn}
                        onClick={() => setFinanceInfoShow(true)}
                      >
                        <MdClose size={20} />
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.detailsCols} col-md-6`}>
                    <FormField
                      name="loanStatus"
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
                              data={statusData}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.updateAmountMain}>
                {financeInfoShow && (
                  <div className={styles.buttonSection}>
                    <button
                      type="button"
                      className={styles.updateInfo}
                      onClick={() => setFinanceInfoShow(!financeInfoShow)}
                    >
                      <div className={styles.updateInfoIcon}>
                        <HiOutlineClock size={60} />
                      </div>
                      <p>
                        The disbursement letter pertaining to this account has
                        not been uploaded by the user.
                      </p>
                    </button>
                  </div>
                )}

                {!financeInfoShow && (
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
                                <Input
                                  placeholder="Enter Case File No"
                                  {...field}
                                />
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
                      <div className={styles.disbursalTitle}>
                        Disbursal Amount
                      </div>
                      <div className={styles.disburseInput}>
                        <FormField
                          name="disbursalAmount"
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
                      <Checkbox />
                      <span className="ms-2">Disbursement completed</span>
                    </div>
                  </>
                )}
              </div>
              <Button
                type="submit"
                variant="accent"
                size="small"
                style={{
                  float: "right",
                  position: "relative",
                  bottom: "1.5rem",
                }}
                onClick={handleClick}
              >
                Submit
              </Button>
            </>
          )}
          {!selected === "no" && (
            <div className={styles.amountBreakup}>
              <div className={styles.title}>Amount Breakup</div>

              <div className={styles.breakupFlex}>
                <div className={styles.breakupTitle}>Motorcycle Amount</div>
                <div className={styles.sbtitle}>₹ 2,32,053</div>
              </div>

              <div className={styles.breakupFlex}>
                <div className={styles.breakupTitle}>Booking Amount</div>
                <div className={styles.sbtitle}>- ₹ 10,000.00</div>
              </div>

              <div className={styles.breakupFlex}>
                <div className={styles.breakupTitle}>Loan Amount</div>
                <div className={styles.sbtitle}>- ₹ 2,00,000.00</div>
              </div>

              <div className={styles.breakupFlex}>
                <div className={styles.breakupTitle}>Financer</div>
                <div className={styles.sbtitle}>IDFC First Bank</div>
              </div>

              <div className={styles.disbursalAmount}>
                <div className={styles.disbursalTitle}>Disbursal Amount</div>
                <FormField
                  name="paymentLink"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className={styles.fullWidth}>
                      <div className={styles["message-wrapper"]}>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="row">
                <div className="col-md-8">
                  <Checkbox
                    label="Payment Link"
                    placeholder="Add Payment Link"
                  />
                </div>
                <div className="col-md-4">
                  <Button type="submit" variant="accent">
                    <span>SEND PAYMENT LINK</span>
                    <IoIosArrowForward />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}

export default Finance
