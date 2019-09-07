var app = require("http").createServer();
var io = require("socket.io")(app);

const port = 9000;

app.listen(port);

let connectCount = 0;

io.on("connection", function(socket) {
  socket.nickname = `user ${connectCount}`;
  connectCount += 1;

  io.emit("message", { data: `${socket.nickname} comme in`, type: "enter" });
  socket.on("message", function(result) {
    io.emit("message", { data: result, name: socket.nickname });
  });
  socket.on("disconnect", function() {
    io.emit("message", { data: `${socket.nickname} left`, type: "left" });
  });
});
