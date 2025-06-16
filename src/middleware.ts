import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Check if this is a protected route
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const isProtectedPage =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/admin");

  // For protected routes, validate session on server
  if (isProtectedPage) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      // If no session found, redirect to login
      if (!session) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      // If session validation fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If user is on auth pages and has a valid session, redirect to dashboard
  if (isAuthPage) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      // If session check fails, allow access to auth pages
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all protected routes
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    // Match auth routes for redirect when logged in
    "/login",
    "/signup",
    // Exclude API routes and static files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
