// app/api/patient/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }, // 👈 params is a Promise
) {
  const { id } = await context.params; // 👈 await it
  console.log("API route hit. Looking up patient with userId:", id);

  if (!id) {
    return NextResponse.json({ error: "Missing id param" }, { status: 400 });
  }

  const patient = await prisma.patient.findFirst({
    where: { userId: Number(id) },
    include: {
      user: true,
      assessments: {
        include: {
          doctor: true,
          payments: true,
          updates: { include: { nurse: true } },
        },
      },
      assignments: { include: { nurse: true } },
      payments: true,
      ratings: { include: { ratedUser: true } },
    },
  });

  if (!patient) {
    console.log("No patient found for userId:", id);
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  console.log("Patient found:", patient);
  return NextResponse.json(patient);
}
