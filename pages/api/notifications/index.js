import { getSession } from 'next-auth/react';
import dbConnection from "../../../utils/dbConnect";
import Notification from '../../../models/notification';
const Question = require('../../../models/question');
const User = require('../../../models/user');

dbConnection();

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    switch (req.method) {
        case 'GET':
            try {
                const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
                return res.json(notifications);
            } catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        
        // case 'POST':
        //     try {
        //         const { type, message, questionId, answerId, data } = req.body;

        //         if (!type || !message) {
        //             return res.status(400).json({ error: 'Type and message are required' });
        //         }

        //         // Fetch the question to get the userEmail
        //         const question = await Question.findById(questionId);
        //         if (!question) {
        //             return res.status(404).json({ error: 'Question not found' });
        //         }

        //         const userEmail = question.creatorEmail;

        //         // Fetch the user to get the userId
        //         const user = await User.findOne({ email: userEmail });
        //         if (!user) {
        //             return res.status(404).json({ error: 'User not found' });
        //         }

        //         const notification = new Notification({
        //             userId: user.id,
        //             type,
        //             message,
        //             questionId,
        //             answerId,
        //             data,
        //         });

        //         await notification.save();

        //         return res.status(201).json(notification);
        //     } catch (error) {
        //         return res.status(500).json({ error: 'Internal Server Error' });
        //     }
        default:
            return res.status(405).json({ error: 'Method Not Allowed' });
    }
}