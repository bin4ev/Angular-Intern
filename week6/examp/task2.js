class Average {
    constructor(n) {
        this.n = n
        this.container = new Array(n)
        this.sum = 0
        this.idx = 0
    }

    next(digit) {
        if (this.container.length < this.n) {
            this.container.push(digit)
            this.sum += digit
            return this.sum / this.container.length
        } else {
            this.next = this.nextFull
            this.next(digit)
        }
    }

    nextFull(digit) {
        this.idx = this.idx % this.n
        this.sum = this.container[this.idx] + digit
        this.container[this.idx] = digit
        this.idx++
        
        return this.sum / this.n
    }
}

let avg = new Average(3)
var val
val = avg.next(1) // 1
val = avg.next(2) // 1.5
val = avg.next(3) // 2
val = avg.next(4) // 3 
val = avg.next(5) // 4
val = avg.next(6) // 4
console.log(val);
