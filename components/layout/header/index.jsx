import Image from "next/image"
import Link from "next/link"
import { FiMenu, FiX } from "react-icons/fi"

import ProfileDropdown from "~/components/profile-dropdown"

// Styles here
import styles from "./header.module.scss"

export function Header(props) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoBox}>
        <Link href={"/"} className={styles.logo}>
          <Image
            src="/d2c/admin/images/logo.jpg"
            layout="fill"
            alt="logo img"
          />
        </Link>
      </div>
      <div className={styles.headRightSec}>
        <ProfileDropdown />
      </div>
      <button className={styles.toggleButton} onClick={props.handleToggle}>
        {!props.isToggled ? <FiMenu /> : <FiX />}
      </button>
    </header>
  )
}

export function LoginHeader() {
  return (
    <header className={styles.loginHeader}>
      <div href={"/"} className={styles.logo}>
        <Image src="/d2c/admin/images/logo.jpg" layout="fill" alt="Logo" />
      </div>
    </header>
  )
}
