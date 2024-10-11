// here we will make a post request to get the access token that we need

export async function POST(req: Request) {
  const { NEXT_PUBLIC_ZOOM_CLIENT_ID, NEXT_PUBLIC_ZOOM_CLIENT_SECRETE } =
    process.env;
  try {
    const response = await fetch("https://zoom.us/oauth/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: "Sd9MnypGChP6EwYGyHPTUu5eic8wUE28A",
        redirect_uri: "http://localhost:3000/teacher",
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${NEXT_PUBLIC_ZOOM_CLIENT_ID}:${NEXT_PUBLIC_ZOOM_CLIENT_SECRETE}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: Request) {
  try {
    const response = await fetch("https://api.zoom.us/v2/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.access_token}`,
      },
    });
    console.log(response);
    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
