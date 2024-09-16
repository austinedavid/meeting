// here, we will register the new user
import prisma from "@/prisma/prismaConnect";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

// now we register the new user
export async function POST(req: NextRequest) {
  const { email, password, username } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return new Response(
      JSON.stringify({ message: "registration successful" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}
