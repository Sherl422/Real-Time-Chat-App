const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app); // Creating the instance of the server.

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User with id: ${socket.id} joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        // Emit the message to all clients in the room
        io.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Server is Running on http://localhost:3001");
});
