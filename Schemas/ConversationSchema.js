exports.ConversationSchema = function(){
	var schema = require('mongoose').Schema({
				id: String,
				participants: [],
				messages: [],
				recentUpdate: Date,
				});
	return schema;
}