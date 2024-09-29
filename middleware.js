import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });

  const { pathname, origin } = req.nextUrl;


  if (pathname.includes("/logIn") || pathname.includes("/signUp")) {
    if (token) {
      return NextResponse.redirect(`${origin}/`);
    }
    return NextResponse.next();
  }

  if (pathname.includes("/Profil") || pathname.includes("/askQuestion") || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    if (!token) {
      console.log("No token found, redirecting to login"); // Log for debugging
      return NextResponse.redirect(`${origin}/logIn`);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/logIn', '/signUp', '/Profil', '/askQuestion', '/admin/:path*','/api/:path*'],
};