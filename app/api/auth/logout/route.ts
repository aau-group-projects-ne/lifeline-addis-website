export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function GET() {
  // Clear the auth_token cookie
  const response = NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    ),
  );
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return response;
}
