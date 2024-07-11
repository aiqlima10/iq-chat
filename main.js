const socket = io();

let username;
let messages = [];

document.getElementById('join').addEventListener('click', () => {
username = document.getElementById('username').value;
socket.emit('join', username);
});

document.getElementById('send').addEventListener('click', () => {
const message = document.getElementById('input').value;
socket.emit('message', message);
document.getElementById('input').value = '';
});

socket.on('users', (users) => {
document.getElementById('users').innerHTML = '';
users.forEach((user) => {
const userDiv = document.createElement('div');
userDiv.textContent = user.username;
document.getElementById('users').appendChild(userDiv);
});
});

socket.on('message', (message) => {
messages.push(message);
updateChatLog();
});

const updateChatLog = () => {
document.getElementById('chat').innerHTML = '';
messages.forEach((message) => {
const messageDiv = document.createElement('div');
messageDiv.textContent = `${message.username}: ${message.text}`;
document.getElementById('chat').appendChild(messageDiv);
});
};

// Initialize chat log
updateChatLog();
