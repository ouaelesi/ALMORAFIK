import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
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

var question = mongoose.model('question', postSchema);

export default question;