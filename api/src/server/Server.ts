import express from 'express';

const server = express();

server.get('/', (req, resp) => {
    return resp.send('Olá DEV!');
})

export {server};