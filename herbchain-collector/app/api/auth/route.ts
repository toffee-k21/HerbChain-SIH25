import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, username, governmentId, location } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    const collectorId = await prisma.collector.create({  data: {
        email,
        password,
        username,
        governmentId,
        location,
      }});

    return NextResponse.json({ collectorId: collectorId }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "User registration failed" }, { status: 500 });
  }
}