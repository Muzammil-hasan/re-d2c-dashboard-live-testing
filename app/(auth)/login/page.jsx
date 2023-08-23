import Image from "next/image"
import Link from "next/link"

import { LoginForm } from "./form"
import styles from "./login.module.scss"

export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormCols}>
          <div className={styles.loginLogo}>
            <Image
              src="/d2c/admin/images/logo_black.png"
              width="236"
              height="32"
              alt="not found"
            />
          </div>

          {/* Login Form */}
          <LoginForm />

          <div className={styles.forgotPass}>
            <Link href="/">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
