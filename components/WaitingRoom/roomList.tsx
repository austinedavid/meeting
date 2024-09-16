"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";

interface ImeetingList {
  id: string;
  link: string;
}

const RoomList = () => {
  const { data, status } = useSession();
  const client = useStreamVideoClient();
  const [allMeetings, setAllMeetings] = useState<ImeetingList[]>();
  const router = useRouter();
  //   use effect to populate the data for the meeting
  useEffect(() => {
    const getMeetingList = async () => {
      const response = await fetch("/api/meeting-list");
      const result = await response.json();
      return setAllMeetings(result);
    };
    getMeetingList();
  }, []);
  //   function to help navigate to meetings
  const navigateToMeeting = async (id: string, desc: string) => {
    // check for authentication first before creating or joining a call
    if (status === "unauthenticated") return alert("you are not authenticated");
    if (!client) return alert("you are not properly set up");
    // here we will then create a call with the id of each room
    try {
      const call = client.call("default", id);
      if (!call) return alert("something went wrong creating a call");
      const startsAt = new Date(Date.now()).toISOString();
      // now we can create or join the call
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: desc,
          },
        },
      });
      router.push(`/meeting/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-screen relative flex items-center justify-center">
      <div className=" w-[250px] px-2 py-3 rounded-md border border-green-800 flex flex-col items-center justify-between">
        <p className=" font-bold">available meeting to join</p>
        <div className=" flex flex-col gap-2 w-full mt-3">
          {allMeetings?.map((meeting, index) => (
            <div
              className=" w-full cursor-pointer hover:border-green-700  border-dashed border-2 border-black px-3 py-2 flex items-center justify-center"
              onClick={() => navigateToMeeting(meeting.id, meeting.link)}
              key={index}
            >
              <p>{meeting.link}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        className=" absolute top-4 right-4 border px-4 py-2 rounded-md border-red-600 cursor-pointer"
        onClick={() => signOut()}
      >
        logout
      </button>
    </div>
  );
};

export default RoomList;
