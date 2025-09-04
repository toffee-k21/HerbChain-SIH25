import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Insert into DB
    const result = await prisma.collector.create({});

    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "User registration failed" }, { status: 500 });
  }
}
