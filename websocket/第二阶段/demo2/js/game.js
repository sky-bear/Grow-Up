const Game = function() {
  // 定义下一个的数据
  // const nextData = Array.from({ length: 4 }).map(_ =>
  //   Array.from({ length: 4 }).fill(0)
  // );
  // 定义当前游戏的数据
  // 20行 10列
  const gameData = Array.from({ length: 20 }).map(_ =>
    Array.from({ length: 10 }).fill(0)
  );
  // gameData中对应数据的类名
  const gameDataClassName = {
    0: "none",
    1: "done",
    2: "current"
  };

  // 当前分数
  let score = 0;
  let scoreDom;
  // 时间dom
  let timeDom;

  let overDom;

  // 定义2个方块
  let cur; //当前方块
  let next; // 下一个方块

  // 下一个div的数据 存储相应的div
  const nextDivs = [];
  // 当前游戏的div数据
  const gameDivs = [];

  // 游戏的相关参数
  const params = {
    rowScore: 10 // number表示 总共消row行 ，分数 row* 10  // 数组表示对应消行的分数
  };
  /*
   *@Descripttion: '初始化游戏数据函数'
   *@param: 'data' { Array } 游戏数据
   *@param: 'contain' { Element } DOM
   *@param: 'divs'  { Array } 存储对应的div节点
   *@return:
   */
  const initDiv = (contain, data, divs) => {
    const { length } = data;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < length; i++) {
      const div = [];
      for (let j = 0; j < data[i].length; j++) {
        const dom = document.createElement("div");
        dom.className = "none";
        dom.style.top = i * 20 + "px";
        dom.style.left = j * 20 + "px";
        fragment.appendChild(dom);
        div.push(dom);
      }
      divs.push(div);
    }
    // 全部循环完成后再插入
    contain.appendChild(fragment);
  };

  /*
   *@Descripttion: '通过游戏数据更新对应的dom 刷新div'
   *@param: 'data' { Array } 游戏数据
   *@param: 'divs'  { Array } 存储对应的div节点
   *@return:
   */
  const refreshGame = (data, divs) => {
    let { length } = data;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        divs[i][j].className = gameDataClassName[data[i][j]];
      }
    }
  };

  // 检测对应点的数据是否合理
  const isValid = function(pos, data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j += 1) {
        if (data[i][j] !== 0 && !check(pos, i, j)) {
          return false;
        }
      }
    }
    return true;
  };
  // 检测点是否合法
  const check = (pos, x, y) => {
    if (pos.x + x >= gameData.length) return false; // 超出下边界
    if (pos.x + x < 0) return false; // 超出上边界
    if (pos.y + y < 0) return false; // 超出左边界
    if (pos.y + y >= gameData[0].length) return false; //超出右边界
    if (gameData[pos.x + x][pos.y + y] === 1) return false; // 已经有落下的
    return true;
  };

  // 清除数据
  const clearData = () => {
    for (let i = 0; i < cur.data.length; i += 1) {
      for (let j = 0; j < cur.data[i].length; j += 1) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
        }
      }
    }
  };

  // 初始数据 初始化游戏中正在落下的方块数据
  const setData = () => {
    for (let i = 0; i < cur.data.length; i += 1) {
      for (let j = 0; j < cur.data[i].length; j += 1) {
        if (check(cur.origin, i, j)) {
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
        }
      }
    }
  };

  // 下移
  const down = function() {
    if (cur.canDown(isValid)) {
      clearData(); // 先清楚原有的数据
      cur.down(); // 更新原点的位置
      setData(); //  更新保存游戏界面的数据
      refreshGame(gameData, gameDivs); // 更新保存的游戏界面中div样式
      return true;
    }
    return false;
  };

  // 左移
  const left = function() {
    if (cur.canLeft(isValid)) {
      clearData(); // 先清楚原有的数据
      cur.left(); // 更新原点的位置
      setData(); //  更新保存游戏界面的数据
      refreshGame(gameData, gameDivs); // 更新保存的游戏界面中div样式
    }
  };
  // 右移
  const right = function() {
    if (cur.canRight(isValid)) {
      clearData(); // 先清楚原有的数据
      cur.right(); // 更新原点的位置
      setData(); //  更新保存游戏界面的数据
      refreshGame(gameData, gameDivs); // 更新保存的游戏界面中div样式
    }
  };
  // 旋转
  const rotate = function() {
    if (cur.canRotate(isValid)) {
      clearData(); // 先清楚原有的数据
      cur.rotate(); // 更新原点的位置
      setData(); //  更新保存游戏界面的数据
      refreshGame(gameData, gameDivs); // 更新保存的游戏界面中div样式
    }
  };
  // 固定
  const fixed = function() {
    for (let i = 0; i < cur.data.length; i += 1) {
      for (let j = 0; j < cur.data[i].length; j += 1) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] === 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }
    refreshGame(gameData, gameDivs);
  };

  //  生成新的
  const performNext = function(type, dir) {
    cur = next;
    setData();
    next = SquareFactory.prototype.make(type, dir);
    refreshGame(gameData, gameDivs);
    refreshGame(next.data, nextDivs);
  };

  // 消行
  checkClear = function() {
    try {
      let list = [];
      for (let i = gameData.length - 1; i >= 0; i -= 1) {
        let clear = true;
        for (let j = 0; j < gameData[i].length; j += 1) {
          if (gameData[i][j] !== 1) {
            clear = false;
            break;
          }
        }
        if (clear) {
          list.push(i);
        }
      }
      if (list.length) {
        list.forEach(item => {
          gameData.splice(item, 1);
        });
        const data = Array.from({ length: list.length }).map(_ =>
          Array.from({ length: 4 }).fill(0)
        );
        gameData.unshift(...data);

        showScore(rowAndScore(list.length));
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 消除行数和分数的关系
  const rowAndScore = function(row) {
    const { rowScore } = params;
    let current;
    if (Array.isArray(rowScore)) {
      if (rowScore[row]) {
        current = row * rowScore[row];
      }
    }
    if (typeof rowScore === "number") {
      current = rowScore * row;
    }
    score += current;
    return score;
  };
  // 实时显示分数
  const showScore = function(score) {
    scoreDom.innerHTML = score;
  };
  // 更新时间
  const setTime = function(time) {
    timeDom.innerHTML = time;
  };

  const gameOverShow = () => {
    overDom.style.display = "block";
  };

  // 检查游戏结束
  const checkGameOver = function() {
    let gameOver = false;
    gameData[0].forEach((_, index) => {
      if (gameData[1][index] === 1) {
        // 判断第二行
        gameOver = true;
      }
    });
    return gameOver;
  };

  // 添加干扰行
  const addTailLines = function(lines) {
    // lines是一个二维数组
    gameData.push(...lines);
    gameData.splice(0, lines.length);
    cur.origin.x = cur.origin.x - lines.length;
    if (cur.origin.x < 0) {
      cur.origin.x = 0;
    }
    refreshGame(gameData, gameDivs);
  };

  // 初始化
  const init = function(doms, type, dir, options) {
    // debugger;
    const { gameDiv, nextDiv, timeDiv, scoreDiv, overDiv } = doms;
    // 初始化数据
    timeDom = timeDiv;
    scoreDom = scoreDiv;
    overDom = overDiv;
    Object.assign(params, options);
    // params = { ...params, ...options };
    next = SquareFactory.prototype.make(type, dir);
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
    refreshGame(next.data, nextDivs);
  };
  // 导出API
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fall = function() {
    while (down()) {}
  };
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.setTime = setTime;
  this.gameOverShow = gameOverShow;
  this.addTailLines = addTailLines;
};
