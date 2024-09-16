import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (session?.user) return redirect("/");
  return <div>{children}</div>;
};

export default Layout;
