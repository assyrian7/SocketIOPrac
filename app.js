var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
	console.log('Http server listening on Port: 3000');
});

io.on('connection', function(socket){
	console.log('Socket connected');
	
	socket.on('allocate', function(msg){
		console.log("Room created " + msg);
		var nse = io.of('/' + msg);
		socket.emit('allocate', 'Room created ' + msg);
		nse.on('connection', function(socket){
			socket.on('update', function(msg){
				//do something
				console.log(msg);
			});
			socket.emit('update', 'hello from server');
		});
		
	});
	
});