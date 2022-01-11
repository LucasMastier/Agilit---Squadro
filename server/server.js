/*const io = require('socket.io')();

io.on('connection', client => {
    client.emit('init', { data: 'hello world' });
});


io.listen(3000);*/


const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();

const clientPath = 'game.html';
console.log(clientPath);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock) => {
    console.log('Someone connected');
    sock.emit('message', 'Hi, you are connected');
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(8080, () => {
    console.log('RPS started on 8080');
});