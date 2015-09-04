var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dt = new Date();
day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// add a 0 before numbers less than 2
if (dt.getMinutes().toString().length <2){
  minutes = '0' + dt.getMinutes();
}

else {
  minutes = dt.getMinutes();
}

var time = " said at " + dt.getHours() + ":" + minutes + " on " + day_array[dt.getDay()];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", function(socket){
  socket.on("chat message", function(message){
    io.emit("chat message", message);
    io.emit("chat message", time);
  });
});

http.listen(8000, function(){
  console.log("listening on: 8000");
});
