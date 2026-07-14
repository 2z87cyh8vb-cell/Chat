const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    io.emit('update_count', io.engine.clientsCount);
    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });
    socket.on('disconnect', () => {
        io.emit('update_count', io.engine.clientsCount);
    });
});

http.listen(process.env.PORT || 3000);