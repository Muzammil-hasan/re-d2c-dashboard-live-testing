import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { getEncryptedKey, loginUser } from "~/app/(auth)/auth.requests"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        const { data, code } = await getEncryptedKey({ email, password })
        if (code !== 200) {
          return null
        }

        const res = await loginUser(data)

        if (res.success) {
          const { user, accessToken, refreshToken } = res.data
          return { user, accessToken, refreshToken }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        ...token.user.user,
        accessToken: token.user.accessToken,
        refreshToken: token.user.refreshToken,
      }
      return session
    },
  },
  pages: {
    signIn: `/d2c/admin/login`,
  },
  session: { strategy: "jwt" },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
