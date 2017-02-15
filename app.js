var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var port = 3000;
http.listen(port, function() {
	    console.log('Server running on port ' + port);
});

io.on('connection', function (socket) {
	socket.on('draw', function (data) {
		socket.broadcast.emit('draw', data);
	});
});
