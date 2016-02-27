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
		res.json(service.register(
						req.body.schoolId,
						req.body.firstName,
						req.body.lastName,
						req.body.course,
						req.body.nickName,
						req.body.password)
		);
    });
    UserController.post('/addFriend',jsonParser,function (request,response) {
        service.addFriend(request.body.user1,request.body.user2,response)
    });
    UserController.post('/isFriend',jsonParser,function (request,response) {
        service.isFriend(request.body.user1,request.body.user2,response)
    });
	
	return UserController;
}