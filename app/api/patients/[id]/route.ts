import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const patient = await prisma.patient.findUnique({
    where: { id: Number(params.id) },
    include: { assessment: true, payments: true },
  });
  return NextResponse.json(patient);
}
