// GLOBALS
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// CONTROLLERS
var userController = require("./Controllers/UserController.js").UserController(jsonParser,userCollection);

// DATBASE
var MongoClient = mongodb.MongoClient;
var MongoServer = mongodb.Server;
var client = new MongoClient(new MongoServer('localhost',27017));
var database = null;
var userCollection = null;
client.connect("mongodb://localhost:27017/CITUMessenger", function(err, db) {
  if(!err) {
    console.log("We are connected");
    database = db;
    userCollection = database.collection('user');
  }
  else
    console.log('Not connected to the Server');
});
app.use('/user',userController);   // Use UserController
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
// SOCKET EVENTS

var message = "chat message";
var userSetName = "set name"
var updateOnlineUsers = "online users update";

// Initialize Connection
var users = [];
io.on('connection', function(socket){

  console.log("A user has connected");
  socket.on('chat message', function(data){
    //io.emit('new message', data.sender + ":       "+data.message);
    io.emit('new message',data);
    console.log(data);
  });
  socket.on("disconnect",function(){
    console.log("A user has disconnected.");

  console.log("A client has connected.");
  addToOnlineUsers(socket);
  socket.on(message, function(data){
    io.emit(message, data.name + ":"+data.message);
  });
  socket.on(userSetName, function(data){
    users[findUsersBySocketId(socket.id)].name = data;
    console.log(socket.id + " SET " + data);
    io.emit(updateOnlineUsers,getOnlineUsers());
  });
});

// helper functions
function findUsersBySocketId(socketId){
  var i=0;
    for(;i<users.length;i++)
      if(users[i].socket.id == socketId)
        break;
  return i;
}
function addToOnlineUsers(socket){
  users[users.length] = {
       'socket':socket,
       'name': "No name"  
  };
}
function getOnlineUsers (){
  var usernames = [];
  for(var i=0;i<users.length;i++){
    usernames[i] = users[i].socket.id + " " + users[i].name;
  }
  return usernames;
};

