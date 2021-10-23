import mongoose from 'mongoose' ; 

const postSchema = mongoose.Schema({
    firstName : String , 
    lastName : String , 
    email : String , 
    profilPic : String , 
}) ; 

var user = mongoose.model( 'user', postSchema);

export default user;

