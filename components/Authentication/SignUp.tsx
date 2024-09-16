"use client";
import React, { useState } from "react";

const SignUp: React.FC<{
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRegister }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [loading, setloading] = useState<boolean>(false);
  // now we register the user
  const handleRegister = async () => {
    // check if all the input is available
    if (!password || !email || !confirmPassword || !username) {
      return alert("please enter all the information");
    }
    // check if password matches
    if (password !== confirmPassword) {
      return alert("password does not match");
    }
    setloading(true);
    // now make the call to the backend
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password, username: username.trim() }),
      }).then((result) => {
        if (result.ok) {
          setRegister(false);
          alert("registing  successful");
        } else {
          return alert("registration failed, something went wrong");
        }
      });
    } catch (error) {
      setloading(false);
      alert("something went wrong");
    }
  };
  return (
    <div className=" w-full flex flex-col gap-2">
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="enter username"
        className=" border focus:outline-none px-2 py-1 "
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter email"
        className=" border focus:outline-none px-2 py-1 "
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
        className=" border focus:outline-none px-2 py-1 "
      />
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirm password"
        className=" border focus:outline-none px-2 py-1 "
      />
      <button
        disabled={loading}
        onClick={handleRegister}
        className=" rounded-md my-2 flex items-center w-full justify-center py-2 bg-green-700 text-white"
      >
        {loading ? "Registering ..." : "Register now"}
      </button>
    </div>
  );
};

export default SignUp;
