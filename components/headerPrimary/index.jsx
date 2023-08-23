// style
import styles from "./style.module.scss"

const HeaderPrimary = ({ headerClass, title, children, headerChildStyle }) => (
  <div className={`${styles.headerPrimary || ""} ${headerClass || ""}`}>
    <div>
      <h4 className={styles.filterHeading}>{title}</h4>
    </div>

    <div className={`${styles.headerActionSection} ${headerChildStyle || ""}`}>{children}</div>
  </div>
)

export default HeaderPrimary
