import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { assessmentId, nurseId, statusUpdate } = await req.json();

    if (!assessmentId || !nurseId || !statusUpdate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const update = await prisma.update.create({
      data: { assessmentId, nurseId, statusUpdate },
    });

    return NextResponse.json(update);
  } catch (err) {
    console.error("Error creating update:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const updates = await prisma.update.findMany({
      include: {
        assessment: { include: { patient: true, doctor: true } },
        nurse: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(updates);
  } catch (err) {
    console.error("Error fetching updates:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
