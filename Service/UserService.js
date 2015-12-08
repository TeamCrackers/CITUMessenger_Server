exports.UserService = function(mongoose){
	var service = {
		UserModel : mongoose.model('User',require('../Schemas/UserSchema.js').UserSchema()),
		login : function(userid,password){
			
		},
		register : function(firstname,lastname,course,nickname){
			var user = new this.UserModel();
			console.log(user);
			user.firstName = firstname;
			user.lastName = lastname;
			user.course = course;
			user.nickName = nickname;
			user.save(function(err){
				if(err){
					console.log("Register Error");
				}
			});
		}
	};
	return service;
}