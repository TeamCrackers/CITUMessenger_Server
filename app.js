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
});
// INITIALIZATION
app.use('/user',userController);   // Use UserController
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Initialize Connection
io.on('connection', function(socket){
  socket.on('chat message', function(data){
    io.emit('chat message', data.name + ":       "+data.message);
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});