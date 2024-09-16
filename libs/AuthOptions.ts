import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/prismaConnect";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Your credential",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const oneUser = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!oneUser) {
          return null; // Return null if the user doesn't exist
        }

        // Compare password with the hashed password stored in the database
        const isValidPassword = bcrypt.compare(
          credentials?.password!,
          oneUser.password
        );

        if (!isValidPassword) {
          return null; // Return null if password is invalid
        }

        // Return user object if everything is correct
        return oneUser;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // here we fetch data that we will use to update the users session data
      // based on the users email.
      const gottenUser = await prisma.user.findFirst({
        where: { email: session.user.email },
      });

      // here we update the session with some important information
      session.user.username = gottenUser?.username!;
      session.user._id = gottenUser?.id!;
      return session;
    },
  },
};
