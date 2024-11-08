import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-clint";
import { client } from "@/sanity/lib/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github,
  ],
  callbacks: {
    async signIn({ user: { name, email, image }, profile, account }) {
      const userId =
        account.provider === "google" ? account.providerAccountId : profile.id;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_ID_QUERY, {
          id: userId,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: userId,
          name,
          username: account.provider === "google" ? name : profile.login,
          email,
          image,
          bio: profile.bio || "Nice to meet you!",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const userId =
          account.provider === "google"
            ? account.providerAccountId
            : profile.id;

        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_ID_QUERY, {
            id: userId,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
