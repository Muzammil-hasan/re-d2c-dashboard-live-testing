import { useState } from "react"
import Image from "next/image"
import { RiCalendarCheckLine, RiFileCopyLine, RiTimeLine } from "react-icons/ri"

import { Checkbox } from "~/components/ui/checkbox"
import { Field, Input, Label } from "~/components/ui/input"
import OutlineDropdown from "~/components/ui/outline-dropdown"
import { DecisionButtons } from "~/components/decision-button"

// Styles
import styles from "./style.module.scss"

function Delivery() {
  const [isEdit, setIsEdit] = useState(false)

  const hanldeChange = () => {}

  const onEditClick = () => {
    setIsEdit(!isEdit)
  }
  return (
    <div className={styles.deliveryMain}>
      <div className={styles.deliveryDetails}>
        <div className={styles.deliveryFlex}>
          <div className={styles.title}>
            <span style={{ backgroundColor: "#DA291C" }} /> Delivery Status:
          </div>
          <div className={styles.statusTag}>
            <OutlineDropdown />
          </div>
        </div>
      </div>
      <div className={styles.deliveryDetails}>
        <div className={`${styles.detailsFlex} row`}>
          <div className={`${styles.detailsCols} col-md-6`}>
            <div className={styles.detailsInput}>
              <Field>
                <Input
                  value="25 June 2023"
                  inputIcon={<RiCalendarCheckLine size={20} />}
                  isShowInputIcon={true}
                />
              </Field>
            </div>
          </div>

          <div className={`${styles.detailsCols} col-md-6`}>
            <div className={styles.detailsInput}>
              <Field>
                <Input
                  value="10:00 AM - 12:00 PM"
                  inputIcon={<RiTimeLine size={20} />}
                  isShowInputIcon={true}
                />
              </Field>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.bottomMD} row`}>
        <div className="col-md-6">
          <Field>
            <Input
              type="text"
              placeholder="28 June 2023 | 12:00 PM - 01:00 PM"
              value="28 June 2023 | 12:00 PM - 01:00 PM"
            />
          </Field>
        </div>
        <div className="col-md-3 d-flex align-items-center mt-2">
          <div className={styles.uploadCancelBtn}>
            <DecisionButtons />
          </div>
        </div>
      </div>

      <div className={styles.deliveryAddress}>
        <div className={styles.saveEditbtn}>
          <div className={`mt-3 mr-3 ${styles.title2}`}>Delivery Address</div>
          <span role="presentation" onClick={onEditClick}>
            {!isEdit ? "Edit" : "Save"}
          </span>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className={`${styles.bottomMD}`}>
              <div className={`${styles.mobileMb} col-md-12 mb-3`}>
                <div className={styles.titlePlaceholder}>Name</div>
                {isEdit ? (
                  <Field>
                    <Input
                      type="text"
                      onChange={hanldeChange}
                      placeholder="Jon Doe"
                      value="Jon Doe"
                    />
                  </Field>
                ) : (
                  <div className={styles.titleInput}>John Doe</div>
                )}
              </div>
              <div className={styles.titlePlaceholder}>Email Address</div>
              <div className="col-md-12">
                <Field>
                  <Input
                    onChange={hanldeChange}
                    placeholder="Email Address"
                    value="johndoe4578@gmail.com"
                  />
                </Field>
              </div>
            </div>

            <div className={`${styles.bottomMD} `}>
              <div className={styles.phoneAddress}>
                <div className={styles.titlePlaceholder}>Phone Number</div>
                {isEdit ? (
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <Field>
                          <Input
                            onChange={hanldeChange}
                            type="text"
                            placeholder="+91"
                            value="+91"
                          />
                        </Field>
                      </div>
                      <div className="col-md-8">
                        <Field>
                          <Input
                            onChange={hanldeChange}
                            type="text"
                            placeholder="+91"
                            value="9876543210"
                          />
                        </Field>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.titleInput}>+91 9876543210</div>
                )}
              </div>
            </div>

            <div className={`${styles.bottomMD} `}>
              <div className="col-12 col-xl-12 col-lg-12 col-md-12">
                <div className={styles.titlePlaceholder}>Address</div>
                {isEdit ? (
                  <Field>
                    <Input
                      as="textarea"
                      onChange={hanldeChange}
                      type="text"
                      placeholder="Address"
                      value="No F 29/2, Phase 2, Okhla Industrial Area, Okhla Industrial Area, New Delhi -110020"
                    />
                  </Field>
                ) : (
                  <div className={styles.titleInput}>
                    No F 29/2, Phase 2, Okhla Industrial Area, Okhla Industrial
                    Area, New Delhi -110020
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles.bottomMD} `}>
              <div className="col-12 col-xl-12 col-lg-12 col-md-12">
                <div className={styles.titlePlaceholder}>Instructions</div>
                {isEdit ? (
                  <Field>
                    <Input
                      as="textarea"
                      onChange={hanldeChange}
                      type="text"
                      placeholder="Instructions"
                      value="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    />
                  </Field>
                ) : (
                  <div className={styles.titleInput}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                )}
              </div>
            </div>

            <div className={`${styles.bottomMD} `}>
              <div className="col-12 col-xl-12 col-lg-12 col-md-12">
                <div className={styles.titlePlaceholder}>Any Request</div>
                {isEdit ? (
                  <Field>
                    <Input
                      as="textarea"
                      onChange={hanldeChange}
                      type="text"
                      placeholder="Any Request"
                      value="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    />
                  </Field>
                ) : (
                  <div className={styles.titleInput}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 ">
            <div className="d-flex justify-content-end">
              <Image
                className={styles.mapImg}
                src="/d2c/admin/images/google-map.png"
                width="150"
                height="150"
                alt="not found"
              />
            </div>

            <div className={styles.linkCopy}>
              <RiFileCopyLine size={20} />
              <p className={styles.textCopy}>Copy Link</p>
            </div>
          </div>
        </div>
        <div className={styles.deliveryDetails}>
          <div className={`${styles.detailsFlex}  row align-items-end`}>
            <span className={styles.title2}>Registration Details</span>
            <div
              md={6}
              className={`${styles.detailsCols} ${styles.bottomMD} col-md-6`}
            >
              <div className={styles.detailsInput}>
                <Field>
                  <Label>Registration Number</Label>
                  <Input
                    onChange={hanldeChange}
                    type="text"
                    placeholder="Registration Number"
                    value="DL 3CA 9910"
                  />
                </Field>
              </div>
            </div>

            <div
              md={6}
              className={`${styles.detailsCols} ${styles.bottomMD} col-md-6`}
            >
              <div className={styles.detailsInput}>
                <Field>
                  <Label>Registration Date</Label>
                  <Input
                    value="25 June 2023"
                    inputIcon={<RiCalendarCheckLine size={20} />}
                    isShowInputIcon={true}
                  />
                </Field>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center">
        <Checkbox />
        <span className="mx-2">Motorcycle Delivered</span>
      </div>
    </div>
  )
}

export default Delivery
