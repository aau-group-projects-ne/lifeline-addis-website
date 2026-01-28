// app/api/doctor/[id]/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  console.log("API route hit. Looking up doctor with userId:", id);

  if (!id) {
    return NextResponse.json({ error: "Missing id param" }, { status: 400 });
  }

  try {
    const doctor = await prisma.user.findFirst({
      where: { id: Number(id), role: "doctor" },
      include: {
        doctorAssessments: {
          include: {
            patient: true,
            updates: { include: { nurse: true } },
          },
        },
        ratingsGiven: true,
      },
    });

    if (!doctor) {
      console.log("No doctor found for userId:", id);
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    console.log("Doctor found:", doctor);
    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
