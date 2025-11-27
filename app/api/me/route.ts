import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/db";
export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie.split("auth_token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ user: user ?? null }, { status: 200 });
  } catch (err) {
    console.error("ME route error:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
