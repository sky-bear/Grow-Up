// 定义下一个的数据
const nextData = [[0, 0, 2, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
// const nextData = Array.from({ length: 4 }).map(_ =>
//   Array.from({ length: 4 }).fill(0)
// );
// 定义当前游戏的数据
// 20行 10列
const gameData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 2, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 1, 1, 1, 1, 0, 0, 0]
];
// const gameData = Array.from({ length: 20 }).map(_ =>
//   Array.from({ length: 10 }).fill(0)
// );
// gameData中对应数据的类名
const gameDataClassName = {
  0: "none",
  1: "done",
  2: "current"
};
// 下一个div的数据
const nextDivs = [];
// 当前游戏的div数据
const gameDivs = [];

const gameDom = document.querySelector("#game");
const nextDom = document.querySelector("#next");
const timeDom = document.querySelector("#time");
const scorDom = document.querySelector("#score");

// 初始化游戏数据
const initGame = () => {
  let gameLength = gameData.length;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < gameLength; i++) {
    const gameDiv = [];
    for (let j = 0; j < gameData[i].length; j++) {
      const dom = document.createElement("div");
      (dom.className = "none"), (dom.style.top = i * 20 + "px");
      dom.style.left = j * 20 + "px";
      fragment.appendChild(dom);
      gameDiv.push(dom);
    }
    gameDivs.push(gameDiv);
  }
  // 全部循环完成后再插入
  gameDom.appendChild(fragment);
};

// 初始化下一个游戏数据
const initNext = () => {
  let nextLength = nextData.length;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < nextLength; i++) {
    const nextDiv = [];
    for (let j = 0; j < nextData[i].length; j++) {
      const dom = document.createElement("div");
      (dom.className = "none"), (dom.style.top = i * 20 + "px");
      dom.style.left = j * 20 + "px";
      fragment.appendChild(dom);
      nextDiv.push(dom);
    }
    nextDivs.push(nextDiv);
  }
  // 全部循环完成后再插入
  nextDom.appendChild(fragment);
};

// 根据gameData中的数据， 更改对应的gameDivs的类名
const refreshGame = () => {
  let gameLength = gameData.length;
  for (let i = 0; i < gameLength; i++) {
    for (let j = 0; j < gameData[i].length; j++) {
      gameDivs[i][j].className = gameDataClassName[gameData[i][j]];
    }
  }
};

// 根据nextData中的数据， 更改对应的nextDivs的类名
const refreshNext = () => {
  let nextLength = nextData.length;
  for (let i = 0; i < nextLength; i++) {
    for (let j = 0; j < nextData[i].length; j++) {
      nextDivs[i][j].className = gameDataClassName[nextData[i][j]];
    }
  }
};

initGame();
initNext();
refreshGame();
refreshNext();
