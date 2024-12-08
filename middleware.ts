import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { userStatus, userStatusResponse } from "./src/lib/auth";
import { getAuthToken } from "./src/lib/cookies";

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = await getAuthToken();
  const authRoutes = ["/dashboard", "/work"];

  const Redirect = async () => {
    const user: userStatusResponse | null = await userStatus();

    if (user?.role.toLowerCase() === "admin" && !pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (user?.role.toLowerCase() === "user" && !pathname.startsWith("/work")) {
      return NextResponse.redirect(new URL("/work", request.url));
    } else {
      return NextResponse.next();
    }
  };

  // Middleware Start

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
