const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { PORT } = require('./config/');

io.on('connection', (socket) => {
  socket.on('chat message', ({ msg, username }) => {
    console.log(msg, username);
    io.emit('chat message', { msg, username });
  });
});

http.listen(PORT, () => console.log('Working'));
