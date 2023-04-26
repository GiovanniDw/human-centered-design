// const express = require('express');
import express from 'express';
import ViteExpress from 'vite-express';
import cors from 'cors';
import http from "http";
import { Server } from 'socket.io';
const app = express();

// ViteExpress.config({mode: "development", "printViteDevServerHost": true});

const CorsOptions = {
  origin: "http://localhost:5173",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: true,
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(CorsOptions));




app.options("*", cors(CorsOptions));

const PORT = process.env.PORT || 3000;

// const socket = require("socket.io")(server, {
//   rejectUnauthorized: false // WARN: please do not do this in production
// });

const server = http.createServer(app).listen(PORT, () => { 
  console.log(`Server is listeningon ${PORT}!`)
});


const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// app.use('*', cors(corsOptions),(req, res) => {
//   console.info("HEAD /");
//   res.sendStatus(200);
// });


io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});


io.on("connection", (socket) => {
  console.log(socket.rooms);

  socket.on("set username", (username) => {
    socket.username = username;


    socket.emit('username', socket.username)
  });
  
  
  // fetch existing users
  console.log("socket connection");
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);


  socket.on("message", (msg) => {
    console.log(msg);
        socket.emit('message', msg)
      })

  

  // // notify existing users
  // socket.broadcast.emit("user connected", {
  //   userID: socket.id,
  //   username: socket.username,
  // });

  // // forward the private message to the right recipient
  // socket.on("private message", ({ content, to }) => {
  //   socket.to(to).emit("private message", {
  //     content,
  //     from: socket.id,
  //   });
  // });


  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});



// httpServer.listen(PORT, () =>
//   console.log(`server listening at http://localhost:${PORT}`)
// );


ViteExpress.bind(app, io);


// https://github.com/troygoode/node-cors-server/blob/master/server.js