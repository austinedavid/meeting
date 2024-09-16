import {
  VideoPreview,
  useCall,
  DeviceSettings,
} from "@stream-io/video-react-sdk";
import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

const PreviewDisabled = () => {
  return (
    <div className=" w-[400px] h-[200px] bg-black items-center justify-center flex">
      <CgProfile className=" text-[50px]" />
    </div>
  );
};

const MeetingSetup: React.FC<{
  setIsMeetingSetup: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsMeetingSetup }) => {
  const [iscamaudioOn, setIsCamAudioOn] = useState<boolean>(false);
  const call = useCall();
  useEffect(() => {
    if (iscamaudioOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [call?.microphone, call?.camera, iscamaudioOn]);
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center">
      <p className=" text-black font-bold">SetUp</p>

      <VideoPreview
        DisabledVideoPreview={PreviewDisabled}
        className=" w-[400px] h-[300px]"
      />
      <div className=" flex items-center justify-center mt-4 gap-2">
        <label className=" flex items-center cursor-pointer ">
          <input
            type="checkbox"
            checked={iscamaudioOn}
            onChange={(e) => setIsCamAudioOn(e.target.checked)}
          />
          join with mic and camera off
        </label>
        <div className=" text-white">
          <DeviceSettings />
        </div>
      </div>
      <button
        className=" text-white bg-green-700 px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-700 ease-in-out"
        onClick={() => {
          call?.join();
          setIsMeetingSetup(false);
        }}
      >
        join meeting
      </button>
    </div>
  );
};

export default MeetingSetup;
