import Notification from '../../models/notification';


const createAnswerNotification = async (userId, questionId, answerId) => {

try{
    const notification = new Notification({
        userId : userId,
        type: 'answer',
        message: 'Someone answered your question!',
        questionId,
        answerId,
    });

    await notification.save();
    } catch (error) {
        console.log('error', error);
    }
};

module.exports = { createAnswerNotification };