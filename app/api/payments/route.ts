import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { patientId, assessmentId, slipUrl } = await req.json();
  const payment = await prisma.payment.create({
    data: { patientId, assessmentId, slipUrl },
  });
  return NextResponse.json(payment);
}
