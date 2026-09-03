import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Protected routes list
  const isProtectedRoute =
    pathname.startsWith("/peta") ||
    pathname.startsWith("/ajuan") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Handle /dashboard root path role redirection
  if (isLoggedIn && pathname === "/dashboard") {
    const roleId = req.auth?.user?.role_id
    if (roleId === 1) {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url))
    }
    return NextResponse.redirect(new URL("/dashboard/user", req.url))
  }

  // Handle /dashboard/admin route protection (Only for Admin role_id === 1)
  if (isLoggedIn && pathname.startsWith("/dashboard/admin")) {
    const roleId = req.auth?.user?.role_id
    if (roleId !== 1) {
      return NextResponse.redirect(new URL("/dashboard/user", req.url))
    }
  }

  return NextResponse.next()
})

// Protected route matchers
export const config = {
  matcher: [
    "/peta/:path*",
    "/ajuan/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
}

