"use client";

import React from "react";

const LayoutTeacher = () => {
  const handleClick = () => {
    window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=http://localhost:3000/teacher`;
  };
  return (
    <div className=" flex w-full h-screen items-center justify-center">
      <button onClick={handleClick}>connect to zoom</button>
    </div>
  );
};

export default LayoutTeacher;
