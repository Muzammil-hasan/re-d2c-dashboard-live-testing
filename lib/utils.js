import { setCookie } from "cookies-next"
import { format } from "date-fns"
import { decode, encode } from "js-base64"

export { default as cn } from "clsx"

export function formatDate(input) {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTimestamp(timestamp) {
  return format(new Date(timestamp), "d MMM, yyyy 'at' h:mm a")
}

export const repeatMap = (count, callback) =>
  Array.from({ length: count }, (_, index) => callback(index))

export function setEncodedCookie(guid, refreshToken, accessToken) {
  const encoded = encode([guid, refreshToken, accessToken].join("#"))
  setCookie(process.env.NEXT_PUBLIC_AUTH_COOKIE, encoded)
}

export function getDecodedCookie(cookie) {
  return decode(cookie).split("#")
}

export async function verifyToken(token) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/verify-token`,
    { headers: { Authorization: token } }
  )
  const data = await res.json()
  return data.success
}

export function formatFileSize(bytes) {
  const megabytes = bytes / (1024 * 1024)
  const kilobytes = bytes / 1024

  return megabytes >= 1
    ? megabytes.toFixed(2) + "MB"
    : kilobytes.toFixed(2) + "KB"
}
