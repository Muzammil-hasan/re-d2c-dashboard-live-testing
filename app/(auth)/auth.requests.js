import axios from "axios"

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
})

export const getEncryptedKey = async ({ email, password }) => {
  const res = await authApi.post(`/encrypt`, { string: `${email}:${password}` })
  return res.data
}

export const loginUser = async (credentials) => {
  const res = await authApi.post(`/login`, { credentials })
  return res.data
}

export async function verifyToken(token) {
  try {
    const res = await authApi.get("/verify-token", {
      headers: { Authorization: token },
    })
    return res.data
  } catch (error) {
    throw error
  }
}
