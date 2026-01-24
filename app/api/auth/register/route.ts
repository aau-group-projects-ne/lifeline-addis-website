import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
      // Only create Patient row if role is patient
      ...(role === "patient" ? { patient: { create: {} } } : {}),
    },
  });
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users);

  return NextResponse.json(user);
}
