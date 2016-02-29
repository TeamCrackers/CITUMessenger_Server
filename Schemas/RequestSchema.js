exports.RequestSchema = function(){
	var schema = require('mongoose').Schema({
				user_id: String,
				conversation_id:String,
                from_user_id: String
				});
	return schema;
}