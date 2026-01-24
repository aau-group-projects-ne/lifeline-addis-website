import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { patientId, doctorId, document, estimatedPrice } = await req.json();
  const assessment = await prisma.assessment.create({
    data: { patientId, doctorId, document, estimatedPrice },
  });
  return NextResponse.json(assessment);
}
