import styles from "./style.module.scss"

const CustomTabs = (props) => (
  <div className={styles.customTabStyle}>
    <ul className={`${styles.navUnderLine} nav nav-tabs`}>
      <li className={`${styles.navItems} nav-item`}>
        <a className={`${styles.navLinkActive}`} href="#">
          {props.title1}
        </a>
      </li>

      <li className={`${styles.navItems} nav-item`}>
        <a className="nav-link" href="#">
          {props.title2}
        </a>
      </li>

      <li className={`${styles.navItems} nav-item`}>
        <a className="nav-link" href="#">
          {props.title3}
        </a>
      </li>

      <li className={`${styles.navItems} nav-item`}>
        <a className="nav-link" href="#">
          {props.title4}
        </a>
      </li>
    </ul>
  </div>
)

export default CustomTabs
