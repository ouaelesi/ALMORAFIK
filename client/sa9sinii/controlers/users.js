import user from "../models/user.js";
import userModel from "../models/user.js";

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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    profilPic: req.body.profilPic,
  });

  user
    .save()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        console.log(err.massage)
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
