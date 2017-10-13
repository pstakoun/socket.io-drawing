# Socket.io Drawing Tutorial

## Installation

* Install Node.js from [nodejs.org](http://nodejs.org)

* Create and navigate into application directory

* Create package.json
```json
// Example package.json
{
	"name": "Socket.IO Drawing Tutorial",
	"version": "1.0.0",
	"author": "Peter Stakoun"
}
```

* Install Express
```shell
$ npm install express --save
```

* Install Socket.IO
```shell
$ npm install socket.io --save
```

## Client (HTML && CSS)

* Create public/index.html
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Socket.IO Drawing Tutorial</title>
		<link rel="stylesheet" href="style.css" />
		<script src="/socket.io/socket.io.js"></script>
		<script src="script.js"></script>
	</head>
	<body>
		<canvas id="canvas"></canvas>
	</body>
</html>
```

* Create public/style.css
```css
html, body {
	margin: 0;
	width: 100%;
	height: 100%;
}

#canvas {
	display: block;
}
```

## Server

* Create app.js

* Add imports
```javascript
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
```

* Specify client file path
```javascript
app.use(express.static(__dirname + '/public'));
```

* Create server
```javascript
var port = 3000;
http.listen(port, function() {
	console.log('Server running on port ' + port);
});
```

* Run the server
```shell
$ node app
```

* See your app (currently a blank page) at [localhost:3000](http://localhost:3000)

* Add event handling
```javascript
io.on('connection', function (socket) {
	socket.on('draw', function (data) {
		socket.broadcast.emit('draw', data);
	});
});
```

## Client (JavaScript)

* Create public/script.js

* Define function to draw lines on client
```javascript
function drawLine(context, x1, y1, x2, y2) {
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}
```

* Excecute script when content loaded
```javascript
document.addEventListener("DOMContentLoaded", function() {
```

* Set up canvas
```javascript
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;
```

* Add mouse state variables
```javascript
	var drawing = false;
	var x, y, prevX, prevY;
```

* Connect to server
```javascript
	var socket = io.connect();
```

* Handle mouse down event
```javascript
	canvas.onmousedown = function(e) {
		drawing = true;
		prevX = x;
		prevY = y;
	}
```

* Handle mouse up event
```javascript
	canvas.onmouseup = function(e) {
		drawing = false;
	}
```

* Handle mouse move event
```javascript
	canvas.onmousemove = function(e) {
```

* Update mouse coordinates
```javascript
		x = e.clientX;
		y = e.clientY;
```

* Check if mouse down
```javascript
		if (drawing) {
```

* Send mouse location to server
```javascript
			socket.emit('draw', {
				'x1': prevX,
				'y1': prevY,
				'x2': x,
				'y2': y
			});
```

* Draw on client
```javascript
			drawLine(context, prevX, prevY, x, y);
			prevX = x;
			prevY = y;
		}
	}
```

* Add listener for drawing from other clients
```javascript
	socket.on('draw', function(data) {
		drawLine(context, data.x1, data.y1, data.x2, data.y2);
	});
});
```

* Run the server
```shell
$ node app
```

* See your completed app at [localhost:3000](http://localhost:3000)
