import React, { useEffect, useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  useCallStateHooks,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import { MdGroups2 } from "react-icons/md";
import { useRouter } from "next/navigation";

const LayoutMap = {
  Speaker: {
    component: SpeakerLayout,
    title: "Speaker layout with spotlight",
    props: {},
  },
  PaginatedGrid: {
    component: PaginatedGridLayout,
    title: "Paginated grid layout",
    props: {
      groupSize: 12,
    },
  },
};

const MeetingProper = () => {
  const [selectedLayout, setSelectedLayout] =
    useState<keyof typeof LayoutMap>("PaginatedGrid");
  const [showUser, setShowUser] = useState<boolean>(false);
  const { useHasOngoingScreenShare } = useCallStateHooks();
  const hasOngoingScreenshare = useHasOngoingScreenShare();
  const router = useRouter();

  const LayoutComponent = LayoutMap[selectedLayout].component;
  const componentProps = LayoutMap[selectedLayout].props;

  useEffect(() => {
    // set screen share compatible layout
    if (hasOngoingScreenshare) return setSelectedLayout("Speaker");

    return setSelectedLayout("PaginatedGrid");
  }, [hasOngoingScreenshare]);
  return (
    <section className=" relative w-full h-screen text-white">
      <div className=" relative w-full h-screen text-white overflow-hidden pt-4">
        <LayoutComponent {...componentProps} />
      </div>
      <div className=" fixed bottom-2 rounded-xl px-2  gap-4 left-1/2 -translate-x-1/2  z-50 w-fit md:px-4 bg-slate-700 flex items-center justify-center ">
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
