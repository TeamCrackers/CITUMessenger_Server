exports.UserSchema = function(){
	var schema = require('mongoose').Schema({
				firstName: String,
				lastName: String,
				course: String,
				nickName: String,
				friends : [],
				online: Boolean
				});
	return schema;
}