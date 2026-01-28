export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { patientId, ratedUserId, score, comment } = await req.json();

    if (!patientId || !ratedUserId || !score || !comment) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const rating = await prisma.rating.create({
      data: { patientId, ratedUserId, score, comment },
    });

    return NextResponse.json(rating);
  } catch (err) {
    console.error("Error creating rating:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
