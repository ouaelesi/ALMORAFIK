import mongoose from 'mongoose' ; 

const postSchema = mongoose.Schema({
    answer : String , 
    creator : String , 
    question : String , 
    sharedFile: String , 
    likes : String , 
})

const answer = mongoose.model("answer" , postSchema) ; 

export default answer ; 