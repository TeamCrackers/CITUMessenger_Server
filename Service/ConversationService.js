exports.UserService = function (mongoose) {
    var ConversationModel =  mongoose.model('Conversation', require('../Schemas/ConversationSchema.js').ConversationSchema())
    var Requestmodel = mongoose.model('Request', require('../Schemas/RequestSchema.js').RequestSchema());
    var service = {
        Model : null,
        RequestModel: null,
        setModel: function(c_model,r_model){
            this.Model = c_model;
            this.RequestModel = r_model;
        },
        createConversation: function(conversation,response){
            var conversationModel = new this.Model();
            conversationModel.id = conversation.id;
            conversationModel.participants = conversation.participants;
            conversationModel.messages = conversation.messages;
            conversationModel.recentUpdate = new Date();
            conversationModel.save(function (err) {
                    var responseData = true;
                    if (err) {
                        console.log("Creation of Conversation Error");
                        responseData = false;
                    }
                    response.json(responseData);
                });
        },
        getConversation: function (conversationId,response) {
            var query = this.Model.findOne({"id":conversationId});
            query.exec(function (err,conversation) {
               response.json(conversation); 
            });
        },
        updateConversation: function (conversation, response) {
            var query = this.Model.findOne({ "id": conversation.id });
            query.exec(function (err, conversationModel) {
                var resp = response;
                conversationModel.participants = conversation.participants;
                conversationModel.messages = conversation.messages;
                conversationModel.recentUpdate = new Date();
                conversationModel.save(function (err) {
                    var responseData = true;
                    if (err) {
                        console.log("Update Conversation Error");
                        responseData = false;
                    }
                    resp.json(responseData);
                });
            });
        },
        createRequest : function(request,response){
           var model =  new this.RequestModel();
           model.user_id = request.user_id;
           model.conversation_id = request.conversation_id;
           model.from_user_id = request.from_user_id; 
           model.save(function(err){
                var responseData = true;
                if (err) {
                    console.log("Update Conversation Error");
                    responseData = false;
                }
                response.json(responseData);
           });
        },
        getAllConversationsOfUser : function(user,response){
            var requests = [];
            response.json(requests);
        },
        getAllRequests: function(user,response){
            var model = this.RequestModel;
            var query = model.find({'user_id':user});
            query.exec(function (err,requests) {
               response.json(requests); 
            });
        }
    };
    service.setModel(ConversationModel,Requestmodel);
    return service;
}