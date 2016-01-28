exports.UserController = function(jsonParser,mongoose){
	var service = require('../Service/UserService.js').UserService(mongoose);
	var UserController  = require('express').Router();
	UserController.post('/login',jsonParser,function(req,res){
		var returnFunction = function(data){
			res.json(data);
		};
		service.login(req.body.schoolId,req.body.password,returnFunction);
	});
	UserController.post('/register',jsonParser,function(req,res){
		service.register(
						req.body.schoolId,
						req.body.firstName,
						req.body.lastName,
						req.body.course,
						req.body.nickName,
						req.body.password);
		res.json(true);
	});
	return UserController;
}