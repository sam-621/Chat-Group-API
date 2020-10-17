const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { PORT } = require('./config/');

io.on('connection', (socket) => {
  socket.on('chat message', ({ msg, username, ID }) => {
    console.log(msg, username, ID);
    io.emit('chat message', { msg, username, ID });
  });
});

http.listen(PORT, () => console.log('Working'));
