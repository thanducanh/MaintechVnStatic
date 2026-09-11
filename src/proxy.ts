import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = "maintech-secret-key-123456";
const key = new TextEncoder().encode(secretKey);

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith("/admin")) {
    const session = request.cookies.get("session")?.value;
    
    if (path === "/admin/login") {
      if (session) {
        try {
          await jwtVerify(session, key, { algorithms: ["HS256"] });
          return NextResponse.redirect(new URL("/admin", request.url));
        } catch (e) {}
      }
      return NextResponse.next();
    }
    
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    try {
      await jwtVerify(session, key, { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch (e) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
