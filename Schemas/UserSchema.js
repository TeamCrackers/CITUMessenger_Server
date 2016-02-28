exports.UserSchema = function(){
	var schema = require('mongoose').Schema({
				schoolId: String,
				password: String,
				firstName: String,
				lastName: String,
				course: String,
				nickName: String,
				friends : [],
                conversations:[],
				online: Boolean
				});
	return schema;
}