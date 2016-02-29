// GLOBALS
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');



app.use(express.static('public'));

mongoose.connect('mongodb://localhost/test');



var userController = require("./Controllers/UserController.js").UserController(jsonParser,mongoose);
var conversationController = require("./Controllers/ConversationController.js").ConversationController(jsonParser,mongoose);

app.use('/user',userController);   // Use UserController
app.use('/conversation',conversationController);   // Use ConversationController
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


var server =  require("./ChatServer.js").initializeChatServer(http);