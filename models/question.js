import mongoose from 'mongoose';

const postSchema = new  mongoose.Schema({
    question: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    answers : [String]
})

let question = mongoose.models.question || mongoose.model('question', postSchema);

export default question;