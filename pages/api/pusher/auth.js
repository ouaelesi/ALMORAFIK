import { getSession } from 'next-auth/react';
import pusher from '../../../utils/pusher';

export default async function handler(req, res) {
  const { socket_id, channel_name } = req.body;
  const auth = pusher.authorizeChannel(socket_id, channel_name);
  res.send(auth);
}