import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  const session = await auth();

  console.log(session);

  return new NextResponse(JSON.stringify({ message: "受信完了" }), {
    status: 200,
  });
};
