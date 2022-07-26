import { verify } from "jsonwebtoken";
const secret = "secret";
import dbConnection from "./dbConnect";

import AuthContext from "./AuthContext";

export function IsLoggedIn(req) {
  let UserEmail;
  try {
    const { cookies } = req;
    const jwt = cookies.OursiteJWT;

    if (jwt) {
      verify(jwt, secret, (err, jwtDecoded) => {
        if (err) {
          return null;
        } else {
          UserEmail = jwtDecoded.email;
        }
      });
      return UserEmail;
    }
  } catch (err) {
    return null;
  }
}
