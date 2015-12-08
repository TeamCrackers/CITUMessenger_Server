// GLOBALS
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var userController = require("./Controllers/UserController.js").UserController(jsonParser,mongoose);
app.use('/user',userController);   // Use UserController
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
