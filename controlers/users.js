import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
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
    console.log(email);
    userModel.findOne({ email: email }).then((user) => {
      console.log(user);
      if (!user) {
        res.status(200).send("err");
      } else {
        bcrypt.compare(
          req.body.hashPassword,
          user.hashPassword,
          function (err, result) {
            if (result) {
              // Send JWT
              const claims = { sub: user._id, userName: user.userName };
              const token = jwt.sign(
                claims,
                "f2f6f77c-afb9-4248-a4e1-84903860c706"
              );
              res.json({ authToken: token });
            } else {
              res.send("somrthing goes wrong!!");
              console.log(user.hashPassword);
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
export const addUser = (req, res) => {
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
  user.hashPassword = bcrypt.hashSync(req.body.hashPassword, 10);
  user
    .save()
    .then((user) => {
      console.log("ouael");
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          username: req.body.userName,
          email: req.body.email,
        },
        "secret"
      );

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
