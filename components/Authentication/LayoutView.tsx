"use client";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LayoutViewAuth = () => {
  const [register, setRegister] = useState<boolean>(true);
  return (
    <div className=" w-full h-screen flex items-center justify-center flex-col">
      <p className=" mb-2 font-bold text-[22px]">Tech Meet</p>
      <div className=" w-[300px] h-fit px-4  border-2 border-green-700 rounded-md flex flex-col items-center ">
        {register ? (
          <p className=" mt-3 font-bold mb-1">SignUp</p>
        ) : (
          <p className=" mt-3 font-bold mb-1">SignIn</p>
        )}
        {register ? <SignUp setRegister={setRegister} /> : <SignIn />}
      </div>
      <div>
        {register ? (
          <small>
            Already have an account{" "}
            <span
              onClick={() => setRegister((prev) => !prev)}
              className=" underline text-blue-700 cursor-pointer"
            >
              signin
            </span>
          </small>
        ) : (
          <small>
            I have no account,{" "}
            <span
              onClick={() => setRegister((prev) => !prev)}
              className=" underline text-blue-700 cursor-pointer"
            >
              signup
            </span>
          </small>
        )}
      </div>
    </div>
  );
};

export default LayoutViewAuth;
