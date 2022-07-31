import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {

  interface Session {
    user: {
      username?:string      
      uid: string
      address:string;
      comment:string;
    } & DefaultSession["user"]
  }
}