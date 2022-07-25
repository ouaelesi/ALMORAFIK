import { NextResponse, NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
const secret = "secret";

export function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.OursiteJWT;
  const { pathname, origin } = req.nextUrl;
  console.log(jwt);
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
