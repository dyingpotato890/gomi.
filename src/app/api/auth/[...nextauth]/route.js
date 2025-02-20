import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Next_Auth_Config from "../../../lib/auth"


secret: process.env.NEXTAUTH_SECRET;
const handler = NextAuth(Next_Auth_Config)
export { handler as GET, handler as POST };