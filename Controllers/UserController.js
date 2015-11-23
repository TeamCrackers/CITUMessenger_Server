exports.UserController = function(jsonParser,userCollection){
	var UserController  = require('express').Router();
	UserController.post('/login',jsonParser,function(req,res){
		
		res.send("naabot:LOGIN");
	});
	UserController.post('/register',jsonParser,function(req,res){
		
		res.send("naabot:REGISTER");
	});
	return UserController;
}