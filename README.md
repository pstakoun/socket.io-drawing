# Socket.io Drawing Tutorial

## Installation
* Install Node.js from https://nodejs.org
* Create and navigate into application directory
* Create package.json
```
// Example package.json
{
	"name": "Socket.IO Drawing Tutorial",
	"version": "1.0.0",
	"author": "Peter Stakoun"
}
```
* Install Express
```
$ npm install express --save
```
* Install Socket.IO
```
$ npm install socket.io --save
```

## Client (HTML && CSS)
* Create public/index.html
```
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
```
html, body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}
```

## Server
* Add imports
```
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
```
* Specify client file path
```
app.use(express.static(__dirname + '/public'));
```
* Create server
```
var port = 3000;
http.listen(port, function() {
	console.log('Server running on port ' + port);
});
```
* Run the server
```
$ node app
```
* See your app (currently a blank page) at http://localhost:3000
