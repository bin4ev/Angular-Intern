class LatestMax {
    constructor(k) {
        this.k = k
        this.content = []
        this.max = -Infinity
        this.idx = 0
    }

    add(n) {
        this.max = Math.max(this.max, n)
        if (this.content.length < this.k) {
            this.content.push(n)
            return this.max
        } else {
            this.add = this.addNext
            return this.add(n)
        }
    }

    addNext(n) {
        this.max = Math.max(this.max, n)
        this.idx = this.idx % this.k
        this.content[this.idx] = n
        if (n < this.max) {
            this.max = this.getMAx(this.content)
        }
        this.idx++
        return this.max
    }

    getMAx(arr) {
        let max = -Infinity
        for (let el of arr) {
            max = Math.max(max, el)
        }

        return max
    }

}

let res;
let data = new LatestMax(3);
res = data.add(1); // 1
res = data.add(0); // 1 
res = data.add(22); // 2
res = data.add(1); // 2
res = data.add(1); // 2
res = data.add(1); // 2
res = data.add(9); // 2
res = data.add(1); // 2
res = data.add(8); // 2
res = data.add(1); // 2
res = data.add(2); // 2



console.log(res);