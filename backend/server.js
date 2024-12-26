const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // ให้อนุญาตจาก frontend ที่ localhost:3000
    methods: ["GET", "POST"],
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);
    
    // ส่งข้อความที่รับมาจาก client ไปยัง client ทุกคน
    io.emit('chat message', msg);

    // ส่งข้อความตอบกลับจาก server
    io.emit('chat message', 'Server: Thank you for your message!');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
