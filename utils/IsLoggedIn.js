import { verify } from "jsonwebtoken";
const secret = "secret";
import dbConnection from "./dbConnect";
import * as jose from "jose";
import AuthContext from "./AuthContext";

export async function IsLoggedIn(req) {
  let UserEmail;
  try {
    const { cookies } = req;
    console.log(cookies.OursiteJWT);
    const jwt = cookies.OursiteJWT;

    if (jwt) {
      // verify(jwt, secret, (err, jwtDecoded) => {
      //   if (err) {
      //     return null;
      //   } else {
      //     UserEmail = jwtDecoded.email;
      //   }
      // });
      // return UserEmail;
      const { payload: jwtData } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(`secret`)
      );
      return jwtData.email;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
}
