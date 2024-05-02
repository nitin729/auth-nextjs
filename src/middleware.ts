import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const localPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";

  if (!token && !localPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && localPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/verifyemail", "/me"],
};
