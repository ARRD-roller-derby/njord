import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import sendVerificationRequest from '../../../config/sendVerificationRequest'
import getSessionWithProfile from '../../../services/auth/getSession'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../db/mongo.auth.connect'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: true,
        ignoreTLS: true,
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        sendVerificationRequest({
          identifier: email,
          url,
        })
      },
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/verify',
  },
  callbacks: {
    async session({ session, token, user }) {
      return getSessionWithProfile({ session, token, user })
    },
  },
})
