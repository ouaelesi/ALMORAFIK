import { verify } from "jsonwebtoken";
const secret = "secret";

const checkUser = async (req, res, next) => {
  const token = req.cookies.OursiteJWT;
  if (token) {
    try {
      verify(token, secret);
      console.log("sahbi");
    } catch (err) {}
  } else {
  }
};
