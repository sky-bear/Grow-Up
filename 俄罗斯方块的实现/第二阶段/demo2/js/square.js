const Square = function() {
  // 方块数据
  // this.data = [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]];
  this.data = Array.from({ length: 4 }).map(_ =>
    Array.from({ length: 4 }).fill(0)
  );
  // 原点
  this.origin = {
    x: 0,
    y: 0
  };
  this.dir = 0;
};

// 验证是否可以下移， 左移， 右移, 旋转
Square.prototype.canDown = function(isValid) {
  const test = {
    x: this.origin.x + 1,
    y: this.origin.y
  };
  return isValid(test, this.data);
};
Square.prototype.canLeft = function(isValid) {
  const test = {
    x: this.origin.x,
    y: this.origin.y - 1
  };
  return isValid(test, this.data);
};
Square.prototype.canRight = function(isValid) {
  const test = {
    x: this.origin.x,
    y: this.origin.y + 1
  };
  return isValid(test, this.data);
};
Square.prototype.canRotate = function(isValid) {
  let d = (this.dir + 1) % 4;
  const test = Array.from({ length: 4 }).map(_ =>
    Array.from({ length: 4 }).fill(0)
  );
  for (let i = 0; i < this.data.length; i += 1) {
    for (let j = 0; j < this.data[i].length; j += 1) {
      test[i][j] = this.rotates[d][i][j];
    }
  }

  return isValid(this.origin, test);
};

// 下移
Square.prototype.down = function() {
  this.origin.x += 1;
};
// 左移
Square.prototype.left = function() {
  this.origin.y -= 1;
};
// 右移
Square.prototype.right = function() {
  this.origin.y += 1;
};
// 旋转
Square.prototype.rotate = function(num) {
  this.dir = num ? this.dir + num : this.dir + 1;
  this.dir = this.dir % 4;
  // this.dir = (this.dir + num) % 4;
  for (let i = 0; i < this.data.length; i += 1) {
    for (let j = 0; j < this.data[i].length; j += 1) {
      this.data[i][j] = this.rotates[this.dir][i][j];
    }
  }
};
