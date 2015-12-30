exports.initializeChatServer = function(http){
	// EVENTS
	var NEW_MESSAGE = "NEW MESSAGE";

	var server = {
		io: null,
		users: [],
		rooms:[],
		
	};

	server.io = require('socket.io')(http);
	server.io.on('connection', function(client){
		var object = {
				user : {},
				socket: {}
			};
		client.on('userid',function(data){
			object.user = data;
			object.socket = client;
			server.users.push(object);
			console.log(server.users.length);
			console.log(server.users);
		});
		client.on("disconnect",function(){
			var index = server.users.indexOf(object);
			if(index>-1){
				server.users.splice(index,1);
			}
			console.log(object.user+" has disconnected");
			console.log(server.users.length);
		});

	});
	return server;
}