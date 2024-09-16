"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { tokenProvider } from "@/actions/stream.action";

import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
const token = "authentication-token";

const StreamProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { data, status } = useSession();
  const user: User = { id: data?.user._id!, name: data?.user.username };

  useEffect(() => {
    if (status === "unauthenticated") return;
    if (!apiKey) return;

    const client = new StreamVideoClient({ apiKey, user, tokenProvider });
    setVideoClient(client);
  }, [status, data?.user]);

  if (!videoClient) return <p>loading...</p>;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamProvider;
