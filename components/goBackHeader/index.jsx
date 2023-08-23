import { BsChevronLeft } from "react-icons/bs"

import OutlineDropdown from "../ui/outline-dropdown"
// style
import styles from "./style.module.scss"

const GoBackHeader = () => (
  <div className={styles.BottomSpace}>
    <div className={styles.BackBtn}>
      <BsChevronLeft className="backBtnIcom" size={15} />
      <span>Go Back</span>
    </div>

    <div className={styles.deliveryFlex}>
      <div className={styles.title}>
        <span style={{ backgroundColor: "#DA291C" }} /> Status:
      </div>
      <div className={styles.dropdownCols}>
        <OutlineDropdown />
      </div>
      <div className={styles.editSaveBtn}>Edit</div>
    </div>
  </div>
)

export default GoBackHeader
