"use client"

import { useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { Button } from "~/components/ui/button"

import { authSchema } from "../auth.validation"
import styles from "./login.module.scss"

export const LoginForm = () => {
  const [isLoading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
  } = useForm({
    resolver: zodResolver(authSchema),
  })

  const handleSignIn = async (data) => {
    try {
      setLoading(true)
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: `${window.location.origin}/d2c/admin`,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(handleSignIn)}>
      <div className={`${styles.loginFormGroup} form-group`}>
        <span className={styles.loginIcons}>
          <Image
            width="15"
            height="15"
            alt="not found"
            src={`/d2c/admin/images/email.svg`}
          />
        </span>
        <input
          className="form-control"
          placeholder="Email / Mobile"
          {...register("email")}
        />
        {getFieldState("email").invalid && (
          <p className={styles.error}>{errors?.email.message}</p>
        )}
      </div>

      <div className={`${styles.loginFormGroup} form-group`}>
        <span className={styles.loginIcons}>
          <Image
            src="/d2c/admin/images/password.svg"
            width="15"
            height="15"
            alt="not found"
          />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Password"
          {...register("password")}
        />
        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.eyeIcon}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </Button>
        {getFieldState("password").invalid && (
          <p className={styles.error}>{errors?.password.message}</p>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          size="rounded"
          variant="light"
          className={styles.submitBtn}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  )
}
