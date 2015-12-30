exports.initializeChatServer = function(http){
	// EVENTS
	var NEW_MESSAGE = "NEW MESSAGE";

	var server = {
		io: null,
		users: [],
		usersMeta:[],
		rooms:[],
		
	};

	server.io = require('socket.io')(http);
	server.io.on('connection', function(client){
		var object = {
				user : {},
				socket: {}
			};
		client.on('userid',function (data){
			object.user = data;
			object.socket = client;
			server.users.push(object);
			server.usersMeta.push({
				username: data,
				socketId : client.id
			});
			console.log("# of Online Users:"+server.usersMeta.length);
			client.emit("online users update",server.usersMeta);
			// TODO:Connect to rooms associated with the user
		});
		client.on("disconnect",function(){
			var index = server.users.indexOf(object);
			if(index>-1){
				server.users.splice(index,1);
				server.usersMeta.splice(index,1);
			}
			console.log(object.user+" has disconnected");
			console.log("# of Online Users:"+server.usersMeta.length);
			client.emit("online users update",server.usersMeta);
		});

		client.on("join room",function (data){
			client.join(data); // Automatically Create a room if not available
			console.log(object.user+" joined room", data);
			console.log(client.rooms);
		});

		client.on("send message",function (data){
			var roomid = data.roomid;
			var message = data.message;
			console.log(object.user+"sent: "+roomid+" "+message);
			client.to(roomid).emit("receive message",data);
		});

		client.on("request user to join room",function (data){
			var userid = data.user;
			var roomid = data.room;
		});

		client.on("leave room",function (data){

		});

	});
	return server;
}