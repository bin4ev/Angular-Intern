class Largest {
    constructor(k) {
        this.k = k
        this.content = new Array(this.k)
        this.min = +Infinity, this.max = -Infinity
        this.idx = 0

    }

    add(n) {
        this.min = Math.min(this.min, n), this.max = Math.max(this.max, n)
     



    /*     this.idx = this.idx % this.k
        this.content[this.idx] = n
        this.idx++
     
 */


        console.log(this.content);
        return this.content[0]
    }
}


let res;
let data = new Largest(3);
res = data.add(0); // undefined
res = data.add(2); // undefined
res = data.add(1); // 0
res = data.add(3); //
/* res = data.add(3); // 0 */
//res = data.add(3); // 0 */
// 1   

console.log(res);

