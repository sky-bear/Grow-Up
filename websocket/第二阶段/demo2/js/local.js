function Local() {
  // 游戏对象
  let game;
  // 间隔时间
  const TIME = 200;
  // 时间计数器
  let timeCount = 0;
  // 时间 游戏时间
  let time = 0;
  // 定时器
  let timer;
  // 绑定键盘事件
  const bindKeyEvent = function() {
    document.onkeydown = function(e) {
      if (e.keyCode === 38) {
        game.rotate();
        // up
      } else if (e.keyCode === 39) {
        // right
        game.right();
      } else if (e.keyCode === 40) {
        // down
        game.down();
      } else if (e.keyCode === 37) {
        // left
        game.left();
      } else if (e.keyCode === 32) {
        // space
        game.fall();
      } else {
        console.log(1);
      }
    };
  };
  // 随机的旋转数
  const generateDir = () => {
    return Math.floor(Math.random() * 4);
  };
  // 随机的图形数
  const generateType = () => {
    return Math.floor(Math.random() * 7);
  };
  const stop = function() {
    if (timer) {
      clearInterval(timer);
    }
    document.onkeydown = null;
  };

  // 随机生成干扰函数
  // 生成的line的行数
  const generateBottomLine = function(line) {
    const list = Array.from({ length: line }).map(_ =>
      Array.from({ length: 10 }, _ => Math.floor(Math.random() * 2))
    );
    return list;
  };

  // 计时函数
  const timeFun = function() {
    timeCount += 1;
    if (timeCount === 5) {
      timeCount = 0;
      time += 1;
      game.setTime(time);
      if (time % 10 === 0) {
        game.addTailLines(generateBottomLine(1));
      }
    }
  };

  // 自动下落
  const move = function() {
    timeFun();
    if (!game.down()) {
      game.fixed();
      game.checkClear();
      if (!game.checkGameOver()) {
        game.performNext(generateType(), generateDir());
      } else {
        stop();
        game.gameOverShow();
      }
    }
  };

  // 开始
  const start = function(options) {
    const doms = {
      gameDiv: document.querySelector("#game"),
      nextDiv: document.querySelector("#next"),
      timeDiv: document.querySelector("#time"),
      scoreDiv: document.querySelector("#score"),
      overDiv: document.querySelector("#over")
    };

    game = new Game();
    game.init(doms, generateType(), generateDir(), options || {});
    // 绑定键盘事件
    game.performNext(generateType(), generateDir());
    bindKeyEvent();
    timer = setInterval(move, TIME);
  };
  this.start = start;
}
