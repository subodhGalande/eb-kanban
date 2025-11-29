import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import argon2 from "argon2";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
