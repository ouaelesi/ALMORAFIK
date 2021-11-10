import user from "../models/user.js";
import userModel from "../models/user.js";
import jwt from 'jsonwebtoken' ;  
import bcrypt from 'bcrypt'
// login required 
const loginReaquired = (req ,res ,next)=>{
  if (req.user){
    next() ; 
  }else{
    return res.status(401).json({message : 'user unauthorised to '})
    }
}
// find users
export const getUsers = (req, res) => {
  userModel.find().then((users) => {
    res.send(users);
  });
};

// add user
export const addUser = (req, res) => {
    if (!req.body){
        res.status(400).send({message : "error occured !!"}) ; 
        return ; 
    }
  const user = new userModel({
    userName: req.body.userName,
    hashPassword : req.body.hashPassword ,
    email: req.body.email,
    profilPic: req.body.profilPic,
  });
  user.hashPassword = bcrypt.hashSync(req.body.hashPassword,10) 
  user
    .save()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.send(err)
    })
};

// Update user 
export const updateUser = (req ,res)=>{
   const id = req.params.id ; 
   userModel.findByIdAndUpdate(id,req.body, { useFindAndModify: false })
     .then(user=>{
         res.send(user) ; 
     })
}

// Delete user
export const deleteUser = (req ,res)=>{
    const id = req.params.id ; 

    userModel.findByIdAndDelete(id)
      .then(user => res.send(`user ${id} deleted succesfuly`))
      .catch(err=>{
          res.status(400).send({message : err.massage || "error occured !!"})
      })
}
