exports.UserSchema = function(){
	var schema = require('mongoose').Schema({
				schoolId: String,
				password: String,
				firstName: String,
				lastName: String,
                email:String,
				course: String,
				nickName: String,
				friends : [],
                online: Boolean
				});
	return schema;
}