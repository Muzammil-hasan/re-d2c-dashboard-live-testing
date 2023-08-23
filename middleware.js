import { NextResponse } from "next/server"

async function userAuthenticate(req) {
  const token = req.cookies.get("next-auth.session-token")
  if (token && token.value) return true
  else return false
}

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const isAuthenticated = await userAuthenticate(request)

  if (!isAuthenticated && !pathname.includes("login")) {
    return NextResponse.redirect(new URL("/d2c/admin/login", request.url))
  } else return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/hsrp/:path*",
    "/enquiry/:path*",
    "/invoiced/:path*",
    "/delivery/:path*",
    "/insurance/:path*",
    "/booking-management/:path*",
    "/requests-management/:path*",
  ],
}
