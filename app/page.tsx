import StartExp from "@/components/StartExp";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return redirect("/authentication");
  return (
    <div>
      <StartExp />
    </div>
  );
};

export default Home;
