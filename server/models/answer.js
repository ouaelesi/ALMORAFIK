import mongoose from 'mongoose' ; 

const postSchema = mongoose.Schema({
    answer : String , 
    creator : String , 
    likes : String , 
})

const answer = mongoose.model("answer" , postSchema) ; 

export default postSchema ; 