const WS = require("nodejs-websocket");

const port = 9000;
const createServer = WS.createServer(connection => {
  connection.on("text", function(result) {
    console.log("发送消息", result);
    connection.sendText(result.toUpperCase() + "!!!");
  });
  connection.on("connect", function(code) {
    console.log("开启连接", code);
  });
  connection.on("close", function(code) {
    console.log("关闭连接", code);
  });
  connection.on("error", function(code) {
    console.log("异常关闭", code);
  });
}).listen(port);

console.log(`websocket server listen on port  ${port}`);
