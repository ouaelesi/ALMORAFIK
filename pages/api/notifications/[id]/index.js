import { getSession } from 'next-auth/react';
import dbConnection from "../../../../utils/dbConnect";
import Notification from '../../../../models/notification';

dbConnection();

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const notifications = await Notification.find({ userId: id });
                if (!notifications.length) {
                    return res.status(404).json({ error: 'Notifications not found' });
                }
                return res.json(notifications);
            } catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        case 'PATCH':
            try {
                const notification = await Notification.findById(id);
                if (!notification) {
                    return res.status(404).json({ error: 'Notification not found' });
                }
                notification.read = true;
                await notification.save();
                return res.json(notification);
            } catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        
        default:
            return res.status(405).json({ error: 'Method Not Allowed' });
    }
}