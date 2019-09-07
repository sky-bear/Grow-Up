const WS = require("nodejs-websocket");

const port = 9000;

let connectCount = 0;

const createServer = WS.createServer(connection => {
  connection.nickname = `user ${connectCount}`;
  connectCount += 1;

  broadcast(
    formatData({ data: `${connection.nickname} comme in`, type: "enter" })
  );
  connection.on("text", function(result) {
    console.log("发送消息", result);
    // broadcast(result);
    broadcast(formatData({ data: result, name: connection.nickname }));
  });
  connection.on("connect", function(code) {
    console.log("开启连接", code);
  });
  connection.on("close", function(code) {
    console.log("关闭连接", code);
    broadcast(
      formatData({ data: `${connection.nickname} left`, type: "left" })
    );
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
// 格式化发送的数据
function formatData({ data, type, name }) {
  return JSON.stringify({ data, type, name });
}

console.log(`websocket server listen on port  ${port}`);
