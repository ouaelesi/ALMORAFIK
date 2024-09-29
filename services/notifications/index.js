import Notification from '../../models/notification';
import dbConnection from '../../utils/dbConnect';
import User from '../../models/user';
import Question from '../../models/question';
import pusher from "../../utils/pusher";

const createAnswerNotification = async (userId, questionId, answerId) => {
    dbConnection();

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const question = await Question.findById(questionId);
        if (!question) {
            throw new Error('Question not found');
        }

        const notification = new Notification({
            userId: userId,
            type: 'answer',
            title: `${user.userName} answered your question!`,
            message:`Your question "${question.title}"  has been answered by ${user.userName}`,
            questionId,
            answerId,
        });
        await notification.save();
        pusher.trigger(`private-user-${userId}`, 'new-notification', notification);
        console.log('notification created and signal sent to :', `private-user-${userId}`);
    } catch (error) {
        console.log('error', error);
    }
};

module.exports = { createAnswerNotification };