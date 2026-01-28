// app/api/nurse/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }, // 👈 same style as patient
) {
  const { id } = await context.params; // 👈 await it
  console.log("API route hit. Looking up nurse with userId:", id);

  if (!id) {
    return NextResponse.json({ error: "Missing id param" }, { status: 400 });
  }

  const nurse = await prisma.user.findFirst({
    where: { id: Number(id), role: "nurse" }, // 👈 look up by userId
    include: {
      nurseAssignments: {
        include: {
          patient: {
            include: {
              assessments: {
                include: {
                  doctor: true,
                  updates: { include: { nurse: true } },
                },
              },
            },
          },
        },
      },
      nurseUpdates: {
        include: {
          assessment: {
            include: { patient: true, doctor: true },
          },
        },
      },
    },
  });

  if (!nurse) {
    console.log("No nurse found for userId:", id);
    return NextResponse.json({ error: "Nurse not found" }, { status: 404 });
  }

  console.log("Nurse found:", nurse);
  return NextResponse.json(nurse);
}
