exports.ConversationController = function(jsonParser,mongoose){
	var service = require('../Service/ConversationService.js').UserService(mongoose);
	var ConversationController  = require('express').Router();
	ConversationController.get('/:conversationId', function (request,response) {
       service.getConversation(request.params.conversationId,response); 
    });
    ConversationController.post('/', jsonParser,function (request,response) {
       service.createConversation(request.body,response); 
    });
    ConversationController.put('/',jsonParser,function (request,response) {
        service.updateConversation(request); 
    });
    ConversationController.get('/getAllConversation/:userid',function(request,response){
        service.getAllConversationsOfUser(request.params.userid,response);
    });
    ConversationController.post('/request/',jsonParser,function(request,response){
        service.createRequest(request.body,response);
    });
    ConversationController.get('/getAllRequests/:userid',function(request,response){
        service.getAllRequests(request.params.userid,response);
    });
	return ConversationController;
}