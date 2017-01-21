// basic variables
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs'); // required for file serving
var sys = require('sys');
var exec = require('child_process').exec;


http.listen(3000, function(){
  console.log('listening on *:3000');
});

// location to index.html
app.get('/', function(req, res){
  console.log("reached");
  res.sendFile(__dirname + '/index.html');
});
app.get('/image', function(req, res){
  fs.readFile(__dirname + '/images/image.jpg', function(err, buf){
    // it's possible to embed binary data
    // within arbitrarily-complex objects
    res.send(buf.toString('base64'));
    console.log('image file is initialized');
  });

  // res.sendFile(__dirname + '/images/image.jpg');
});

// only to test chat sample code from sample
io.on('connection', function(socket){

  console.log('a user connected');
    // broadcast a message
  socket.broadcast.emit('chat message', 'System Broadcast Message: a user has been connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  });
  globalSocket = null;
  io.on('connection', function(socket){
    globalSocket = socket;
    fs.readFile(__dirname + '/images/image.jpg', function(err, buf){
      // it's possible to embed binary data
      // within arbitrarily-complex objects
      socket.emit('image', { image: true, buffer: buf.toString('base64') });
      console.log('image file is initialized');
    });
  });


  var callback = function () {
    // fs.readFile(__dirname + '/images/image.jpg', function(err, buf){
      // it's possible to embed binary data
      // within arbitrarily-complex objects
      // globalSocket.emit('image', { image: true, buffer: buf.toString('base64') });
      // console.log('image file is initialized');
    // });
  };

// trying to serve the image file from the server
setInterval(function () {
  // if(globalSocket !== null){
    exec("screencapture -C -x -t jpg images/image.jpg", callback);
  // }
}, 100);
