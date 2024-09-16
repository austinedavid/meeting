"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert("email and password needed");
    setloading(true);
    try {
      const shows = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (shows?.ok) {
        router.push("/");
      } else {
        alert("wrong credentials");
      }
    } catch (error) {
      setloading(false);
      alert("something went wrong");
    }
  };
  return (
    <div className=" w-full flex flex-col gap-2">
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter email"
        className=" border focus:outline-none px-2 py-1"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
        type="password"
        className=" border focus:outline-none px-2 py-1 "
      />
      <button
        disabled={loading}
        onClick={handleLogin}
        className=" rounded-md my-2 flex items-center w-full justify-center py-2 bg-green-700 text-white"
      >
        {loading ? "verifying..." : "Login"}
      </button>
    </div>
  );
};

export default SignIn;
