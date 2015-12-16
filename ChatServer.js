exports.initializeChatServer = function(http){
	// EVENTS
	var NEW_MESSAGE = "NEW MESSAGE";

	var server = {
		io: null,
		users:[],
		rooms:[],
		
	};

	server.io = require('socket.io')(http);
	server.io.on('connection', function(socket){
		socket.on('userid',function(data){
			server.users[socket] = data;
			console.log(server.users);
			socket.emit("online users update",server.users);
		});
		socket.on("disconnect",function(){
			var index = server.users.indexOf(socket);
			var user = server.users[socket];
			if(index>-1){
				server.users.splice(index,1);
			}
			console.log(user+" has disconnected");
		});

	});
	return server;
}