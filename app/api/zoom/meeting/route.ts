// here we should be able to get a meeting
// or create a meeting for our users
export async function POST(req: Request) {
  try {
    const createdMeetings = await fetch(
      `https://api.zoom.us/v2/users/${process.env.zoomUserId}/meetings`,
      {
        method: "POST",
        body: JSON.stringify({
          agenda: "backed dev class",
          password: "55555",
          duration: 120,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.access_token}`,
        },
      }
    );
    const result = await createdMeetings.json();
    console.log(result);
    return new Response(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}
