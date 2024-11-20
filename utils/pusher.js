import Pusher from 'pusher';

const pusher = new Pusher({
    appId: '1872606',
    key: 'c136048a3b3fdd39b363',
    secret: '24fa5f6962dd23fa07a3',
    cluster: 'eu',
    useTLS: true,
});

export default pusher;
