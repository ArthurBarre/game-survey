// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 


const messages = []
const users = [];
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');

app.get('/game', function(req, res,next) {  
  res.render('pages/game',{
    messages:messages
  });
    // res.sendFile(__dirname + '/public/home.html');
});
app.get('/', function(req, res,next) {  
  res.render('pages/home',{
    link: 'localhost:3000/game'
  });
});

io.on('connection', function(client) {  
    client.on('newMessageInput', function(data) {
      messages.push(data)
    io.emit('newMessageOutput', data);
    });
    client.on('newUserInput', function(user) {
      users.push(user)
    io.emit('newUserOutput', users);
    });
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
}); 