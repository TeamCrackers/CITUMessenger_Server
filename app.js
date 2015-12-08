// GLOBALS
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// CONTROLLERS
var schema = require('mongoose').Schema({
  id: String,
  firstName: String,
  lastName: String,
  course: String,
  nickName: String,
  friends : [],
  online: Boolean
});
var userController = require("./Controllers/UserController.js").UserController(jsonParser,mongoose,schema);
app.use('/user',userController);   // Use UserController
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
// SOCKET EVENTS
//var chatServer = require("./Controllers/UserController.js").initializeChatServer(http);