import React, { useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
} from "@stream-io/video-react-sdk";
import { MdGroups2 } from "react-icons/md";
import { useRouter } from "next/navigation";

const MeetingProper = () => {
  const [showUser, setShowUser] = useState<boolean>(false);
  const router = useRouter();
  return (
    <section className=" relative w-full h-screen text-white">
      <div className=" relative w-full h-screen text-white overflow-hidden pt-4">
        <PaginatedGridLayout />
      </div>
      <div className=" fixed bottom-0 px-2  gap-4  z-50 w-full flex items-center justify-center ">
        <CallControls
          onLeave={() => {
            router.push("/meeting");
          }}
        />
        <div
          onClick={() => setShowUser((prev) => !prev)}
          className=" hidden md:flex cursor-pointer w-[40px] aspect-square text-white bg-black  items-center justify-center rounded-full"
        >
          <MdGroups2 />
        </div>
      </div>
      {showUser && (
        <div className=" absolute top-0 right-0  bg-slate-800 pb-4 px-3 text-white">
          <CallParticipantsList onClose={() => setShowUser(false)} />
        </div>
      )}
    </section>
  );
};

export default MeetingProper;
