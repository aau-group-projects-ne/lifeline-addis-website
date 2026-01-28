export const runtime = "nodejs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Clear the auth_token cookie and redirect to home
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return response;
}
