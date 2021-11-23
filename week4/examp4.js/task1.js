class Range {
    constructor(start, end) {
      this.start = start
      this.end = end
    }
  }
  
  class Matrix {
    constructor(width, height, element = (x, y) => undefined) {
      this.width = width;
      this.height = height;
      this.content = Array(width * height);
  
      for (let i = 0; i < content.length; i++) {
        this.content[i] = element(i % width, Math.floor(y / width));
      }
    }
  
    getPos(x, y) {
      return y * this.width + x
    }
    
    get(x, y) {
      return this.content[getPos(x, y)];
    }
    
    set(x, y, value) {
      this.content[getPos(x, y)] = value;
    }
  
    subMatrix(rwidth, rheight) {
      var width = rwidth.end - rwidth.start + 1
      var height = rheight.end - rheight.start + 1
      var fillFunc = (x, y) => this.get(x + rwidth.start, y + rheight.start)
      return new Matrix(width, height, fillFunc)
    }
  }