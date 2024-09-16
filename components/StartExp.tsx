"use client";

import React from "react";
import { useRouter } from "next/navigation";

const StartExp = () => {
  const router = useRouter();
  const handlestart = () => {
    router.push("/meeting");
  };
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <div
        className=" cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md"
        onClick={handlestart}
      >
        Explore now
      </div>
    </div>
  );
};

export default StartExp;
