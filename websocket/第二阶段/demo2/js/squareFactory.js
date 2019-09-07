const Square1 = function() {
  // 方块数据
  Square.call(this);
  this.rotates = [
    [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
    [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
    [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]]
  ];
};
const Square2 = function() {
  Square.call(this);
  this.rotates = [
    [[0, 2, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 2, 0], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 2, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]]
  ];
};
const Square3 = function() {
  Square.call(this);
  this.rotates = [
    [[2, 2, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 2, 0, 0], [0, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 0, 0], [2, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]]
  ];
};
const Square4 = function() {
  Square.call(this);
  this.rotates = [
    [[2, 2, 2, 0], [2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
    [[0, 0, 2, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0, 0], [2, 0, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0]]
  ];
};
const Square5 = function() {
  Square.call(this);
  this.rotates = [
    [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  ];
};
const Square6 = function() {
  Square.call(this);
  this.rotates = [
    [[0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
    [[0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]]
  ];
};
const Square7 = function() {
  Square.call(this);
  this.rotates = [
    [[2, 2, 0, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 2, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 2, 0, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[0, 2, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]]
  ];
};
Square1.prototype = Square2.prototype = Square3.prototype = Square4.prototype = Square5.prototype = Square6.prototype = Square7.prototype =
  Square.prototype;

const SquareFactory = function() {};
SquareFactory.prototype.make = function(index, dir) {
  let s;
  index += 1;
  switch (index) {
    case 1:
      s = new Square1();
      break;
    case 2:
      s = new Square2();
      break;
    case 3:
      s = new Square3();
      break;
    case 4:
      s = new Square4();
      break;
    case 5:
      s = new Square5();
      break;
    case 6:
      s = new Square6();
      break;
    case 7:
      s = new Square7();
      break;
    default:
      break;
  }
  s.origin.x = 0;
  s.origin.y = 0;
  s.rotate(dir);
  return s;
};
