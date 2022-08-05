import { verify } from "jsonwebtoken";
const secret = "secret";
import dbConnection from "./dbConnect";
import * as jose from "jose";
import AuthContext from "./AuthContext";

export async function IsLoggedIn(req) {
  let UserEmail;
  try {
    const { cookies } = req;
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
      let token = { email: jwtData.email, userName: jwtData.username };
      return token;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
