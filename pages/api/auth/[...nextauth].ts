
import NextAuth, { User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {Session} from "next-auth"

type CustomSession = User & {username?:string, uid?:string}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    
  ],
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async session({session, token, user}) {
        session.user.username = session.user.name!.split(' ').join('').toLowerCase();
        session.user.uid = token.sub;
      return session
    }
  }
})