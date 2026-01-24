import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("slip") as File;
  const patientId = Number(formData.get("patientId"));
  const assessmentId = Number(formData.get("assessmentId"));

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  fs.writeFileSync(filePath, buffer);

  const slipUrl = `/uploads/${file.name}`;

  const payment = await prisma.payment.create({
    data: { patientId, assessmentId, slipUrl },
  });

  return NextResponse.json(payment);
}
