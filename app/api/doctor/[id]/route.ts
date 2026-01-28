// app/api/doctor/[id]/route.ts
<<<<<<< HEAD
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
=======
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
>>>>>>> main
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
<<<<<<< HEAD
            patient: true, // patient linked to each assessment
            updates: { include: { nurse: true } }, // updates with nurse info
          },
        },
        ratingsGiven: true, // ratings this doctor has given (optional)
=======
            patient: { include: { user: true } },
            updates: { include: { nurse: true } },
          },
        },
        ratingsGiven: true,
>>>>>>> main
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
