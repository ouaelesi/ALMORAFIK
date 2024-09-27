const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, 
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: function() { return this.type === 'answer'; } },
  answerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', required: function() { return this.type === 'answer'; } },
  data: { type: mongoose.Schema.Types.Mixed , required: false }, 
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

module.exports = Notification;