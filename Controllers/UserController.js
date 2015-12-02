exports.UserController = function(jsonParser,userCollection){
	var UserController  = require('express').Router();
	UserController.post('/login',jsonParser,function(req,res){
		console.log(req.body );
		var data = {
			'id':"ABCDEFG",
			'firstName': "username",
			'lastName': "password"
		};
		res.json(data);
		
	});
	UserController.post('/register',jsonParser,function(req,res){
		var data = {
			'id':"ABCDEFG",
			'firstName': "username",
			'lastName': "password"
		};
		res.json(data);
	});
	UserController.get('/test',jsonParser,function(req,res){
		var data = {
			'firstName': "username",
			'lastName': "password"
		};
		res.json(data);
		//res.send("naabot:REGISTER");
	});
	return UserController;
}