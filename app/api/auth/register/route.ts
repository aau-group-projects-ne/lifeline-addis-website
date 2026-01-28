export const runtime = "nodejs";
// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields (name, email, password, role) are required" },
        { status: 400 },
      );
    }

    // Ensure role is valid
    const validRoles = ["patient", "doctor", "nurse", "admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user + conditional related record
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
        ...(role === "patient" ? { patient: { create: {} } } : {}),
        // If you later want doctor/nurse-specific tables, add them here:
        // ...(role === "doctor" ? { doctor: { create: {} } } : {}),
        // ...(role === "nurse" ? { nurse: { create: {} } } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
