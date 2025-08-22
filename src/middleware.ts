import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public access to /login and /signup routes
  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.next();
  }

  // Read token from cookies (Edge-safe). Adjust cookie name if different.
  const token = request.cookies.get("accessToken")?.value;
  console.log({ token });
  // If no token, redirect to login page (include redirect param)
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow authenticated requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)"],
};
