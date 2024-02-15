const socket = io();
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const name = prompt("Enter username")
socket.emit('user-joined', name)

function formatChatMsg(message, className) {
  let msgElement = document.createElement('p');
  msgElement.className = className;
  msgElement.innerHTML = message;
  messageContainer.appendChild(msgElement)
}

socket.on('server-message', (msg) => {
  formatChatMsg(msg, 'serverMsg')
})

socket.on('chat-message', (msg, name) => {
  formatChatMsg(name + ': ' + msg, 'message')
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value
  if (message == "") return
  messageInput.value = ""
  socket.emit('send-chat-msg', message, name)
  formatChatMsg(name + ': ' + message, 'message')
})