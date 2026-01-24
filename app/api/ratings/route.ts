import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { patientId, ratedUserId, score, comment } = await req.json();
  const rating = await prisma.rating.create({
    data: { patientId, ratedUserId, score, comment },
  });
  return NextResponse.json(rating);
}
