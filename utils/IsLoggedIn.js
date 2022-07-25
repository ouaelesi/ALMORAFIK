import { verify } from "jsonwebtoken";
const secret = "secret";

export function IsLoggedIn(req) {
  try {
    const { cookies } = req;
    const jwt = cookies.OursiteJWT;

    if (jwt) {
      verify(jwt, secret);
      return true;
    }
  } catch (err) {
    return false;
  }
}
