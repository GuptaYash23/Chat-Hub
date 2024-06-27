const io = require("socket.io")(5000, { cors: { origin: "*" } });

const user = {};

io.on("connect", (socket) => {
  socket.on("newuser", (name) => {
    if (name !== null) {
      user[socket.id] = name;
      socket.broadcast.emit("userpopup", name);
    }
  });

  socket.on("send", (msg) => {
    socket.broadcast.emit("receive", { message: msg, name: user[socket.id] });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", user[socket.id]);
    delete user[socket.id];
  });
});



