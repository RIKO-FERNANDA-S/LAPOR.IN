import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user.password_hash) {
          throw new Error("No user found with this email or password not set")
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        )

        if (!isPasswordCorrect) {
          throw new Error("Incorrect password")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role_id: user.role_id,
          village: user.village,
          city: user.city,
          province: user.province,
          latitude: user.latitude,
          longitude: user.longitude,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role_id = (user as any).role_id
        token.village = (user as any).village
        token.city = (user as any).city
        token.province = (user as any).province
        token.latitude = (user as any).latitude
        token.longitude = (user as any).longitude
      }

      // Re-fetch fresh user details from DB if token exists
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: {
              role_id: true,
              village: true,
              city: true,
              province: true,
              latitude: true,
              longitude: true,
            },
          })
          if (dbUser) {
            token.role_id = dbUser.role_id
            token.village = dbUser.village
            token.city = dbUser.city
            token.province = dbUser.province
            token.latitude = dbUser.latitude
            token.longitude = dbUser.longitude
          }
        } catch (e) {
          // ignore db fetch errors during token refresh
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
        session.user.role_id = token.role_id as number | undefined
        session.user.village = token.village as string | undefined
        session.user.city = token.city as string | undefined
        session.user.province = token.province as string | undefined
        session.user.latitude = token.latitude as number | undefined
        session.user.longitude = token.longitude as number | undefined
      }
      return session
    },
  },
})