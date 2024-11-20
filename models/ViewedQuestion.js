import mongoose from "mongoose";

const viewedQuestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // index: true  // Add index for better query performance
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  },
  viewType: {
    type: String,
    enum: ['scroll', 'click'],
    default: 'scroll'
  }
});

// // Create compound index for faster queries
// viewedQuestionSchema.index({ userId: 1, questionId: 1 }, { unique: true });

const ViewedQuestion = mongoose.models.viewedQuestion || mongoose.model('viewedQuestion', viewedQuestionSchema);

export default ViewedQuestion;
