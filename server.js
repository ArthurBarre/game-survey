var express = require('express');  
var path = require('path');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 


const messages = []
const users = [];
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.get('/game', function(req, res,next) {  
  res.render('pages/game',{
    messages:messages
  });
    // res.sendFile(__dirname + '/public/home.html');
});
app.get('/', function(req, res,next) {  
  res.render('pages/home');
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
server.listen(1111, function(){
  console.log('listening on *:3000');
}); 
