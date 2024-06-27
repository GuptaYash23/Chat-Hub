const socket = io("http://localhost:5000");

const form = document.querySelector("#msgform");
const msg = document.querySelector("#messageinput");
const msgcontainer = document.querySelector(".messagecontainer");
let audionewuser = new Audio("../assets/audio/newuser.mp3");
let audiomsg = new Audio("../assets/audio/msg.mp3");

const appendjoin = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("join-message");
  messageElement.classList.add(position);
  msgcontainer.append(messageElement);
  audionewuser.play();
};

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  msgcontainer.append(messageElement);
  msgcontainer.scrollTop = msgcontainer.scrollHeight;
  if (position == "left") {
    audiomsg.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msg.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  msg.value = "";
});

const username = prompt("Enter your name");

socket.emit("newuser", username);

socket.on("userpopup", (name) => {
  appendjoin(`${name} joined the chat`, "left");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name} left the chat`, "left");
});
