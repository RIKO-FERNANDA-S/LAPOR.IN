"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { motion } from "framer-motion"

export default function LoginButton() {
  // data berisi info user (nama, email, foto), status berisi "loading", "authenticated", atau "unauthenticated"
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="animate-pulse w-24 h-10 bg-gray-200 rounded-lg"></div>
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <img 
          src={session.user?.image || ""} 
          alt="Profile" 
          className="w-10 h-10 rounded-full border-2 border-indigo-500"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">{session.user?.name}</span>
          <span className="text-xs text-gray-500">{session.user?.email}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          Logout
        </motion.button>
      </div>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("google")} // Langsung tembak ke provider Google
      className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Masukkan path SVG logo Google di sini */}
        <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
      </svg>
      Login with Google
    </motion.button>
  )
}