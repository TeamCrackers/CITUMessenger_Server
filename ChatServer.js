function initializeChatServer(http){
	// EVENTS
	var NEW_MESSAGE = "NEW MESSAGE";

	var server = {
		io: null,
		users:[],
		rooms:[],
		
	};

	server.io = require('socket.io')(http);
	server.io.on('connection', function(socket){
	  
	});
	return server;
}