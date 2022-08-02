
import NextAuth, { User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {Session} from "next-auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    })
    
  ],
  pages: {
    signIn: "/auth/signin"
  },
  secret: process.env.SECRET,
  callbacks: {
    async session({session, token, user}) {
        session.user.username = session.user.name!.split(' ').join('').toLowerCase();
        session.user.uid = token.sub as string;
      return session
    }
  }
})