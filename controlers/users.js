import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import * as jose from "jose";

// login required
const loginReaquired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "user unauthorised to " });
  }
};
// login funnction
export const logIn = (req, res) => {
  const email = req.body.email;
  try {
    userModel.findOne({ email: email }).then((user) => {
      if (!user) {
        res.status(200).send("err");
      } else {
        bcrypt.compare(
          req.body.hashPassword,
          user.hashPassword,
          async function (err, result) {
            if (result) {
              const token = await new jose.SignJWT({
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
                username: user.userName,
                email: user.email,
              })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("30d")
                .sign(new TextEncoder().encode(`secret`));

              const serialised = serialize("OursiteJWT", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });

              res.setHeader("Set-Cookie", serialised);
              res.json({ authToken: token });
            } else {
              res.status(401).send({ message: "something goes wrong!!" });
            }
          }
        );
      }
    });
  } catch (err) {
    res.send(err);
  }
};
// find users
export const getUsers = (req, res) => {
  userModel.find().then((users) => {
    res.send(users);
  });
};

// add user
export const addUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "error occured !!" });
    return;
  }
  const user = new userModel({
    userName: req.body.userName,
    hashPassword: req.body.hashPassword,
    email: req.body.email,
    profilPic: req.body.profilPic,
  });
  if (await emailExists(user.email)) {
    res.status(409).send({ message: "This email already exists" });
    return;
  }
  user.hashPassword = bcrypt.hashSync(req.body.hashPassword, 10);
  user
    .save()
    .then(async (user) => {
      const token = await new jose.SignJWT({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: req.body.userName,
        email: req.body.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(new TextEncoder().encode(`secret`));
      // const token = sign(
      // {
      //   exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
      //   username: req.body.userName,
      //   email: req.body.email,
      // },
      //   "secret"
      // );

      const serialised = serialize("OursiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);
      res.status(200);
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Update user
export const updateUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((user) => {
      res.send(user);
    });
};

// Delete user
export const deleteUser = (req, res) => {
  const id = req.query.id;

  userModel
    .findByIdAndDelete(id)
    .then((user) => res.send(`user ${id} deleted succesfuly`))
    .catch((err) => {
      res.status(400).send({ message: err.massage || "error occured !!" });
    });
};

// Get User By Id
export const getUserById = async (req, res) => {
  const id = req.query.id;
  userModel
    .findOne({ email: id })
    .then((user) => res.send(user))
    .catch((err) => res.send(err.message));
};

// Verify if the Email Exists
export const emailExists = async (email) => {
  const user = await userModel.findOne({ email: email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const addProfilPhoto = (fileName, userEmail) => {
  userModel
    .findOneAndUpdate(
      { email: userEmail },
      { profilPic: `/uploads/${fileName}` }
    )
    .then((user) => console.log(user))
    .catch((err) => console.log(err.message));
};

export const logOut = async (req, res) => {
  const serialised = serialize("OursiteJWT", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);
  res.status(200).send(serialised);
};
