exports.UserController = function(jsonParser,mongoose,schema){
	var service = require('../Service/UserService.js').UserService(mongoose);
	var UserController  = require('express').Router();
	UserController.post('/login',jsonParser,function(req,res){
		res.json(req.body);
		
	});
	UserController.post('/register',jsonParser,function(req,res){
		service.register(req.body.firstName,
						req.body.lastName,
						req.body.course,
						req.body.nickName);
		res.json(true);
	});
	return UserController;
}