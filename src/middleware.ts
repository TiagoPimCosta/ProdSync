import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuthToken } from "./lib/cookies";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  role: string;
  id: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = await getAuthToken();
  const authRoutes = ["/dashboard", "/work"];

  const Redirect = async () => {
    try {
      const decoded = jwtDecode<JWTPayload>(token || "");

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Role-based redirects
      if (decoded?.role.toLowerCase() === "admin" && !pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (decoded?.role.toLowerCase() === "user" && !pathname.startsWith("/work")) {
        return NextResponse.redirect(new URL("/work", request.url));
      } else {
        return NextResponse.next();
      }
    } catch (error) {
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL("/", request.url));
    }
  };

  if (!token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (token && pathname.startsWith("/")) ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/work")
  ) {
    return Redirect();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/work/:path*"],
};
