"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { StreamClient, UserRequest } from "@stream-io/node-sdk";

const apikey = process.env.NEXT_PUBLIC_STREAM_KEY;
const secretekey = process.env.STREAM_SECRETE_KEY;

export const tokenProvider = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(session);
  // return an error if user does not exist
  if (!user) throw new Error("user is not authenticated");
  if (!apikey) throw new Error("No apikey provided");
  if (!secretekey) throw new Error("No secretekey provided");

  const client = new StreamClient(apikey, secretekey, { timeout: 1000000 });
  const newUser: UserRequest = {
    id: session.user._id,
    role: "user",
    custom: {
      color: "red",
    },
    name: session.user.username,
  };

  await client.upsertUsers([newUser]);
  // validity is optional (by default the token is valid for an hour)
  const validity = 60 * 60 * 2;
  const token = client.generateUserToken({
    user_id: session.user._id,
    validity_in_seconds: validity,
  });
  //   here we return the token we generated
  return token;
};
