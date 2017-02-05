// basic variables
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs'); // required for file serving
var sys = require('sys');
var exec = require('child_process').exec;


http.listen(3000, function() {
    console.log('listening on *:3000');
});

// location to index.html
app.get('/', function(req, res) {
    console.log("reached");
    res.sendFile(__dirname + '/index.html');
});
app.get('/image/:id', function(req, res) {
    fs.readFile(__dirname + '/images/image.jpg', function(err, buf) {
        // it's possible to embed binary data
        // within arbitrarily-complex objects
        res.send(buf.toString('base64'));
        console.log('image file is initialized');
    });

    // res.sendFile(__dirname + '/images/image.jpg');
});
var sockets = [];
// only to test chat sample code from sample
io.on('connection', function(socket) {
    console.log('a user connected');
});
io.on('connection', function(socket) {
    sockets.push(socket);
    fs.readFile(__dirname + '/images/image.jpg', function(err, buf) {
        // it's possible to embed binary data
        // within arbitrarily-complex objects
        socket.emit('image', {
            image: true,
            buffer: buf.toString('base64')
        });
        screenshot();

        console.log('image file is initialized');
    });
});


var callback = function() {
    exec("python compressor.py", function () {
       fs.readFile(__dirname + '/images/image.jpg', function(err, buf){
        // it's possible to embed binary data
        // within arbitrarily-complex objects
        for (var i = 0; i < sockets.length; i++) {
          sockets[i].emit('image', { image: true, buffer: buf.toString('base64') });
        }
        screenshot();
      });
    });
};

var screenshot = function() {
    exec("screencapture -C -x -t jpg images/image.jpg", callback);
}
