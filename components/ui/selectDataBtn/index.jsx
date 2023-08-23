import { BiCheck } from "react-icons/bi"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"

import styles from "./style.module.scss"

const SelectDataBtn = () => {
  return (
    <div className={styles.selectSection}>
      <div className={styles.verticalDivider} />
      <div className={`${styles.selectData} my-3`}>
        <div className="d-flex align-items-center">
          <Checkbox />
          <h4 className={`${styles.selectText} mx-2`}>Select all -</h4>
          <Button size="snug">
            <BiCheck size={20} />
            <span>Approve</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SelectDataBtn
