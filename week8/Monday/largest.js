class Largest {
  constructor(k) {
    this.k = k;
    this.content = new Array(this.k);
    this.min = +Infinity;
    this.idx = 0;
  }

  getMin(arr) {
    let min = +Infinity;
    for (let el of arr) {
      min = Math.min(min, el);
    }
    
    return min
  }

  add(n) {
    this.min = Math.min(this.min, n);
    this.idx = this.idx % this.k;
    this.content[this.idx] = n;
    if (this.idx % 2 == 0) {
      this.min = this.getMin(this.content);
    }
    this.idx++;

    return this.min;
  }
}

let res;
let data = new Largest(3);
res = data.add(0); // 
res = data.add(2); // 
res = data.add(1); // 
 res = data.add(8); //
res = data.add(3); // 
res = data.add(1);
res = data.add(2);
console.log(res);
