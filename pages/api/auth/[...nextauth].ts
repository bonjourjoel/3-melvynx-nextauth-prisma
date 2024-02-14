import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import NextAuth from "next-auth/next";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;
if (!githubId || !githubSecret) {
  throw new Error("Missing GITHUB_ID or GITHUB _SECRET environment variables.");
}

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
if (!googleId || !googleSecret) {
  throw new Error("Missing GOOGLE_ID or GOOGLE _SECRET environment variables.");
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma) as Adapter,
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
