<<<<<<< HEAD
const allUsers = await prisma.user.findMany({
  include: { patient: true, doctorAssessments: true, nurseAssignments: true },
});
=======
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: aggregate patients and caregivers
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({ include: { user: true } });
    const doctors = await prisma.user.findMany({ where: { role: "doctor" } });
    const nurses = await prisma.user.findMany({ where: { role: "nurse" } });

    // Build doctor-patient links using latest assessment per patient
    const assessments = await prisma.assessment.findMany({
      include: {
        doctor: true,
        patient: { include: { user: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const linksMap = new Map<
      number,
      {
        assessmentId: number;
        patientId: number;
        patientName: string;
        doctorId: number;
        doctorName: string;
        assignedAt: Date;
      }
    >();

    for (const a of assessments) {
      if (!linksMap.has(a.patientId)) {
        linksMap.set(a.patientId, {
          assessmentId: a.id,
          patientId: a.patientId,
          patientName: a.patient?.user?.name || `Patient #${a.patientId}`,
          doctorId: a.doctorId,
          doctorName: a.doctor?.name || `Doctor #${a.doctorId}`,
          assignedAt: a.createdAt,
        });
      }
    }

    const links = Array.from(linksMap.values());

    return NextResponse.json({ patients, doctors, nurses, links });
  } catch (err) {
    console.error("Admin GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: assign patient to doctor by creating an assessment
export async function POST(request: Request) {
  try {
    const { patientId, doctorId, document, estimatedPrice } =
      await request.json();
    if (!patientId || !doctorId) {
      return NextResponse.json(
        { error: "patientId and doctorId required" },
        { status: 400 },
      );
    }

    const assessment = await prisma.assessment.create({
      data: {
        patientId: Number(patientId),
        doctorId: Number(doctorId),
        document: document || "Assigned by admin",
        estimatedPrice: Number(estimatedPrice ?? 0),
      },
    });

    return NextResponse.json(assessment, { status: 201 });
  } catch (err) {
    console.error("Admin POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
>>>>>>> main
