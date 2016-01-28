exports.UserService = function(mongoose){
	var service = {
		UserModel : mongoose.model('User',require('../Schemas/UserSchema.js').UserSchema()),
		login : function(schoolIdData,password,parentCallBackFunction){
			var userModel = this.UserModel;

			result = "wala na usab";
			
			callBack = function(err,resultQuery)
				{
					if(err)
						console.log(err);
					else{
						result = resultQuery;
						
						if(result != null ){
							if(result.password != password)
							 result = {
								errorMessage : "Wrong Credentials",
							};
						}	
						else{
							result = {
								errorMessage : "User does not exist.",
							};
							
						}
					}
					parentCallBackFunction(result);
				};
			console.log("Data"+schoolIdData);
			var query = {schoolId:""};
			query.schoolId += schoolIdData;
			console.log(query.schoolId);
			console.log(query);
			userModel.findOne(query,callBack);
				
			
			
		},
		register : function(schoolId,firstname,lastname,course,nickname,password){
			var user = new this.UserModel();
			user.schoolId = schoolId;
			user.firstName = firstname;
			user.lastName = lastname;
			user.course = course;
			user.nickName = nickname;
			user.password = password;
			user.save(function(err){
				if(err){
					console.log("Register Error");
				}
			});
		}
	};
	return service;
}