import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });

  const { pathname, origin } = req.nextUrl;

  console.log("Token:", token); // Log the token for debugging

  // Allow access to login and signup pages if the user is not authenticated
  if (pathname.includes("/logIn") || pathname.includes("/signUp")) {
    if (token) {
      return NextResponse.redirect(`${origin}/`);
    }
    return NextResponse.next();
  }

  // Protect routes that require authentication
  if (pathname.includes("/Profil") || pathname.includes("/askQuestion") || pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token found, redirecting to login"); // Log for debugging
      return NextResponse.redirect(`${origin}/logIn`);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/logIn', '/signUp', '/Profil', '/askQuestion', '/admin/:path*'],
};