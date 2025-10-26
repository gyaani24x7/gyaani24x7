import { prisma } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
  })
],
callbacks:{
  async signIn(params){
    console.log(params)
    try{
      await prisma.user.create({
        data: {
          name: params.user.name,
          email: params.user.email,
        }
      })
      return true
    }catch(e){
      console.log(e)
      return false
    }
 }
}

})

export { handler as GET, handler as POST }