export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { patientId, nurseId } = await req.json();
  const assignment = await prisma.assignment.create({
    data: { patientId, nurseId },
  });
  return NextResponse.json(assignment);
}
