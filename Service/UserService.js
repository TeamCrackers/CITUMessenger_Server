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
                    return false;
				}
			});
            return true;
		},
        addFriend: function(user1SchooldId,user2SchoolId,response){
            var userModel = this.UserModel;
            var query1 = userModel.findOne({"schoolId":user1SchooldId});
            var query2 = userModel.findOne({"schoolId":user2SchoolId});
            query1.exec(function(err,user1){
                if(!err)
                    query2.exec(function(err,user2){
                        var user = user1;
                        user1.friends.push(user2.schoolId);
                        user2.friends.push(user1.schoolId);
                        user1.save();
                        user2.save();
                        response.json(true);
                    })
                else
                    response.json(false);
            });
        },
        isFriend: function(user1SchooldId,user2SchoolId,response){
            var userModel = this.UserModel;
            var query = userModel.findOne({"schoolId":user1SchooldId});
            query.exec(function(err,user){
                var found = false;
                if(user!=null)
                    for(var i=0;i<user.friends.length;i++)
                        if(user.friends == user2SchoolId)
                            {
                                found = true;
                                break;
                            }
                response.json(found);
            });
        },
        getUser: function(schoolId,response){
            var userModel = this.UserModel;
            var query = userModel.findOne({"schoolId":schoolId});
             query.exec(function(err,user){
                 response.json(user);
             });
        },
        updateUser : function(user,response){
            var userModel = this.UserModel;
            var query = userModel.findOne({"schoolId":user.schoolId});
             query.exec(function(err,userModel){
                 var resp = response;
                 userModel.schoolId = user.schoolId;
                 userModel.password = user.password;
                 userModel.firstName = user.firstName;
                 userModel.lastName = user.lastName;
                 userModel.course = user.course;
                 userModel.nickName = user.nickName;
                 userModel.friends = user.friends;
                 userModel.conversations = user.conversations;
                 userModel.save(function(err){
                    var response = true;
                    if(err){
                        console.log("Register Error");
                        response = false;    
                    }
                    resp.json(response);
			     });
             });
        }
	};
	return service;
}