class Socket {
  constructor(app) {
    this.http = require('http').createServer(app);
    this.io = require('socket.io')(this.http);
    this.connection();
  }

  connection() {
    this.io.on('connection', (socket) => {
      this.sendMessage(socket, this.io);
    });
  }

  sendMessage(socket, io) {
    socket.on('chat message', ({ msg, username, ID }) => {
      io.emit('chat message', { msg, username, ID });
    });
  }
}

module.exports = Socket;
