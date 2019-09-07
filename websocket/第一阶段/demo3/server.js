const WS = require("./../node_modules/nodejs-websocket");

const port = 9000;

let connectCount = 0;

const createServer = WS.createServer(connection => {
  connection.nickname = `user ${connectCount}`;
  connectCount += 1;
  broadcast(`${connection.nickname} comme in`);

  connection.on("text", function(result) {
    console.log("发送消息", result);
    broadcast(result);
  });
  connection.on("connect", function(code) {
    console.log("开启连接", code);
  });
  connection.on("close", function(code) {
    console.log("关闭连接", code);
    broadcast(`${connection.nickname}  left`);
  });
  connection.on("error", function(code) {
    console.log("异常关闭", code);
  });
}).listen(port);

function broadcast(str) {
  createServer.connections.forEach(connection => {
    connection.sendText(str);
  });
}

console.log(`websocket server listen on port  ${port}`);
