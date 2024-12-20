import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import * as jose from "jose";
import Role from "../models/role.js"

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
  console.log(req.body);
  const email = req.body.email;
  try {
    userModel.findOne({ email: email }).then((user) => {
      if (!user) {
        console.log("we are here");
        res.status(401).send("User Or Password Not correct !!");
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
                userId : user._id
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
              res
                .status(401)
                .send({ message: "User Or Password Not correct !!" });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
};

// find users
export const getUsers = (req, res) => {
  userModel.find().then((users) => {
    res.send(users);
  });
};

// signup 

export const signUp = async (req, res) => {
  console.log("arrived",req.body);
  if (req.method !== "POST") {
    return res.status(405).end(); 
  }


  const { userName, email, hashPassword, wilaya, speciality, level, role , profilePictureUrl } = req.body;


  if (!userName || !email || !hashPassword) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: "This email already exists" });
  }

  const hashedPassword = bcrypt.hashSync(hashPassword, 10);

  const roleUser = await Role.findOne({ name: role || "student" });

  // const profilePictureUrl = req.file ? `/uploads/profilePictures/${req.file.filename}` : '';

  const user = new userModel({
    userName,
    email,
    hashPassword: hashedPassword,
    wilaya,
    speciality,
    level,
    role: roleUser._id,
    photo: profilePictureUrl,
  });
  await user.save();

  const token = await new jose.SignJWT({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
    username: userName,
    email,
    userId: user._id,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.SECRET || "secret"));

  const serialized = serialize("OursiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  res.status(200).send(user);
};

// add user
export const addUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Must have a body !!" });
    return;
  }
  const user = new userModel({
    userName: req.body.userName,
    hashPassword: req.body.hashPassword,
    email: req.body.email,
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
        userId : user._id
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
