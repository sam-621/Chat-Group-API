const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { PORT } = require('./config/');

app.get('/', (req, res) => {
  res.send('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => console.log('Working'));
