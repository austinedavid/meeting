import NextAuth from "next-auth";
import { authOptions } from "@/libs/AuthOptions";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      email: string;
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
