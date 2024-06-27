import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/db";
import { baseUserSchema } from "@/app/lib/baseUserSchema";

const registerSchame = baseUserSchema.omit({ confirmPassword: true });

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validatedFields = registerSchame.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse(
        JSON.stringify(validatedFields.error.flatten().fieldErrors),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: validatedFields.data.email,
      },
    });

    if (user) {
      return new NextResponse(
        JSON.stringify({ message: "このメールアドレスは既に使用されています" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    const response = await prisma.user.create({
      data: {
        email: validatedFields.data.email,
        password: hashedPassword,
      },
    });

    return new NextResponse(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "ユーザー登録に失敗しました" }),
      { status: 500 }
    );
  }
};
