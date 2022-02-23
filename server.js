const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { WebSocketServer } = require("ws");
const socket = new WebSocketServer({ server });
const serverPort = 8080

app.use(express.json());

//when a websocket connection is established
socket.on("connection", (client) => {
  client.send('{ "connection" : "ok"}');

  //when a message is received
  client.onmessage = (message) => {
    //send the message to all clients
    socket.clients.forEach(client => client.send(message.data));
  }

});

//start the web server
server.listen(serverPort, () => {
  console.log(
    `Websocket server started on port ` + serverPort
  );
});
