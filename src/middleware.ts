import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = request.cookies.get("next-auth.session-token");
  if (!session) {
    // Set callbackUrl for redirect after login success
    response.cookies.set("originCallbackUrl", request.nextUrl.pathname);
  }

  return response;
}

export const config = {
  matcher: ["/orders:path*", "/checkout:path*", "/account:path*"],
};
