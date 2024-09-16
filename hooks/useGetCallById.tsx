import { useState, useEffect } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [loading, setLoading] = useState<boolean>(true);
  //   get the client
  const client = useStreamVideoClient();
  useEffect(() => {
    if (!client) return;
    // lets loading the call to the call state
    // this function is to filter all the existing calls and get only one call that we can use
    // there is only likelihood that one call is exist because we will filter by the id
    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });
      // lets set call state if there is any call filtered here
      if (calls.length > 0) setCall(calls[0]);
      //   set loading state to false
      setLoading(false);
    };
    loadCall();
  }, [client, id]);

  return { call, loading };
};
