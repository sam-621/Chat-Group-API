const express = require('express');
const Socket = require('./socket');
const { PORT } = require('./config/');

const app = express();
const socket = new Socket(app);

socket.http.listen(PORT, () => console.log('Working'));
