export { auth as proxy } from "@/auth"

// Tentukan rute mana saja yang mau diproteksi
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
