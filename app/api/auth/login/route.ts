// app/api/login/route.ts  (or wherever your login endpoint lives)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose"; // ← Import from jose

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Basic input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // IMPORTANT: Use a strong secret (at least 32 characters)
    // Put this in .env: JWT_SECRET=your-super-long-random-string-here
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    // Create the JWT using jose (HS256 symmetric signing)
    const token = await new SignJWT({
      id: user.id,
      role: user.role,
      // Add more claims if needed, e.g. email: user.email
    })
      .setProtectedHeader({ alg: "HS256" }) // HS256 = HMAC SHA-256 (same as jsonwebtoken default)
      .setIssuedAt() // iat: current time
      .setExpirationTime("1d") // expires in 1 day (same as your original)
      .sign(secret);

    // Option 1: Return token in JSON body (for client-side storage, e.g. localStorage)
    return NextResponse.json({ token });

    // Option 2: (Strongly recommended for security) Set as httpOnly cookie instead
    /*
    const response = NextResponse.json({ success: true, message: "Logged in" });

    response.cookies.set("auth_token", token, {
      httpOnly: true,           // Prevents JS access → better security
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "strict",
      maxAge: 60 * 60 * 24,     // 1 day in seconds
      path: "/",
    });

    return response;
    */
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
