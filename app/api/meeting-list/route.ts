// for creating links for a meeting here
import prisma from "@/prisma/prismaConnect";
import { NextRequest } from "next/server";

// creating meeting here
export async function POST(req: NextRequest) {
  const { name } = await req.json();
  try {
    await prisma.meetingRooms.create({
      data: {
        link: name,
      },
    });
    return new Response(JSON.stringify({ message: "successfully created" }), {
      status: 200,
    });
  } catch (error) {
    throw new Error("something went wrong, try again please");
  }
}

// get all the meetings here
export async function GET() {
  try {
    const allMeetings = await prisma.meetingRooms.findMany();
    return new Response(JSON.stringify(allMeetings), { status: 200 });
  } catch (error) {
    throw new Error("something went wrong, try again please");
  }
}
