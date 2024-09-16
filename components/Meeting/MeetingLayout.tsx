"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { StreamTheme, StreamCall } from "@stream-io/video-react-sdk";
import MeetingSetup from "./MeetingSetup";
import MeetingProper from "./MeetingProper";
import { useGetCallById } from "@/hooks/useGetCallById";

const MeetingLayout = () => {
  const { id } = useParams();
  const [isMeetingSetup, setIsMeetingSetup] = useState<boolean>(true);
  const { loading, call } = useGetCallById(id);
  //   return loading id is loading
  if (loading)
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <p>loading...</p>
      </div>
    );
  return (
    <main className=" w-full h-screen relative">
      <StreamTheme>
        <StreamCall call={call}>
          {isMeetingSetup ? (
            <MeetingSetup setIsMeetingSetup={setIsMeetingSetup} />
          ) : (
            <MeetingProper />
          )}
        </StreamCall>
      </StreamTheme>
    </main>
  );
};

export default MeetingLayout;
