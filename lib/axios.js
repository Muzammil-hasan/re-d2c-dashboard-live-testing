import { redirect } from "next/navigation"
import axios from "axios"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

import { authOptions } from "~/app/api/auth/[...nextauth]/route"

const isServer = typeof window === "undefined"

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

baseApi.interceptors.request.use(
  async (config) => {
    let session
    if (isServer) session = await getServerSession(authOptions)
    else session = await getSession()

    if (session) {
      config.headers.Authorization = `${session.user.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

baseApi.interceptors.response.use(
  async (response) => response,
  (error) => {
    if (error.response?.data?.message === "Access token Expired") {
      redirect("/login")
    } else return Promise.reject(error)
  }
)
