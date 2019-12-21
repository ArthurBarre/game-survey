var socket = io.connect();
const username  = document.getElementById('username');
const msg = document.getElementById('msg');
const usernameSession = localStorage.getItem('username');
const usernameWitness = document.getElementById('usernameWitness');
const messages = document.getElementById('messages');

if (usernameSession){
  usernameWitness.innerHTML = usernameSession;
  // window.location.href = 'http://localhost:3000/game.html'
} 

function sendMessage(){
  const msgValue = msg.value;
  socket.emit('newMessageInput',msgValue);
  console.log( msgValue);
  
}

function register(){
  const userValue = username.value;
  socket.emit('newUserInput',userValue);
  localStorage.setItem('username', JSON.stringify(userValue));
  if (usernameSession){
    usernameWitness.innerHTML =usernameSession;
  } 
  console.log( userValue);
}




socket.on('newUserOutput', function(users){
  console.log(users)
});

// socket.on('newMessageOutput', function(messages){
//   console.log(messages)
// });