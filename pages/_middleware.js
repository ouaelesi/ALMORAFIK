import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
const secret = "secret";

export function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const { pathname, origin } = req.nextUrl;

  if (pathname.includes("/logIn") || pathname.includes("/signUp")) {
    if (jwt) {
      try {
        verify(jwt, secret);
        return NextResponse.redirect(`${origin}/`);
      } catch (err) {
        return NextResponse.next();
      }
    }
  }

  if (pathname.includes("/Profil")) {
    if (jwt === undefined) {
      return NextResponse.redirect(`${origin}/logIn`);
    }
    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(`${origin}/logIn`);
    }
  }
}
