const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

const io = require('socket.io')(server);

server.listen(port, function () {
  console.log(`server listening at port ${port}`);
});

// routing
app.use(express.static(path.join(__dirname, 'public')));

// config
// put middlewares here
app.set('view engine','html');


// a place for server data
let clients = [];
let data = {numClients: 0, shared: "some data"};

io.on('connection', function (socket) {

  clients.push(socket);
  data.numClients += 1;
  console.log(`client socket connected numClients = ${data.numClients}`);
  socket.emit('connection', data.numClients);

  socket.on('disconnect', function () {
    let clientIndex = clients.indexOf(socket);
    clients.splice(clientIndex, 1);
    data.numClients -= 1;
    console.log(`client ${clientIndex} disconected numClients = ${data.numClients}`);
  });

  socket.on('client action', function (data) {
    io.sockets.emit('new data', data);
  })
});
