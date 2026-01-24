import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { assessmentId, nurseId, statusUpdate } = await req.json();
  const update = await prisma.update.create({
    data: { assessmentId, nurseId, statusUpdate },
  });
  return NextResponse.json(update);
}
