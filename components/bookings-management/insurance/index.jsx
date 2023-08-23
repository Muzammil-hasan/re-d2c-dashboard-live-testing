"use client"

import { useState } from "react"

import { Checkbox } from "~/components/ui/checkbox"
import { Field, Input, Label } from "~/components/ui/input"
import Radio from "~/components/ui/radio"
import { DecisionButtons } from "~/components/decision-button"

import styles from "./style.module.scss"

function Insurance() {
  const [selected, setSelected] = useState("yes")

  const handleShow = (e) => {
    const getShow = e.target.value
    setSelected(getShow)
  }

  return (
    <div className={styles.insuranceMain}>
      {["radio"].map((type) => (
        <div key={`inline-${type}`} className={styles.formCols}>
          <Radio
            label="Self Purchased"
            name="group1"
            id={`inline-${type}-1`}
            onClick={handleShow}
          />
          <Radio
            label="RE Facilitated"
            name="group1"
            id={`inline-${type}-2`}
            onClick={handleShow}
          />
        </div>
      ))}

      <div className={styles.insuranceForm}>
        {selected === "yes" && (
          <>
            <div className={styles.title}>Payment Details</div>
            <div className="row mt-3">
              <div className="col-md-6">
                <Field>
                  <Label>Add Insurance Amount</Label>
                  <Input value="₹ 10,958.00" />
                </Field>
                <div className="d-flex align-items-center mt-3 mb-3">
                  <Checkbox />
                  <span className="ms-2">Payment Successful</span>
                </div>
              </div>
            </div>
            <div className={styles.title}>Policy details</div>
            <div className="row">
              <div className="col-md-6">
                <Field>
                  <Label>Policy Number</Label>
                  <Input value="12983913929929" />
                </Field>
              </div>
              <div className="col-md-6">
                <Field>
                  <Label>Uploaded insurance policy cover</Label>
                  <Input type="file" value="12983913929929" />
                </Field>
              </div>
            </div>
          </>
        )}

        {selected === "no" && (
          <>
            <div className={styles.title}>Policy details</div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <Field>
                  <Label>Policy Number</Label>
                  <Input value="12983913929929" />
                </Field>
              </div>
              <div className="mb-3 col-md-6">
                <Field>
                  <Label>Insurance Amount</Label>
                  <Input value="₹ 10,958.00" />
                </Field>
              </div>
              <div className="col-md-6">
                <Field>
                  <Label>Uploaded Policy</Label>
                  <Input type="file" value="Huter350_policy.pdf" />
                </Field>
              </div>
              <div className="col-md-3">
                <div className={styles.uploadCancelBtn}>
                  <DecisionButtons />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Insurance
