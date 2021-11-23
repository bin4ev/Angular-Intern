//Да се разработи клас Join който получaва в конструктора неограничен брой обекти от тип Iterable. обекта от тип Join да може да итерира последователно всяка от подадените колекции.

class Join {
    constructor(...params) {
        this.input = params
    }
    get() {
        return this.input
    }
}

class JoinIterator {
    constructor(join) {
        this.data = join.get()
        this.i = 0
        this.j = 0
    }

    next() {
        if (this.j > this.data[this.i].length - 1) {
            this.i++
            this.j = 0
        }
        let result = {}
        if ((this.i >= this.data.length)) {
            result = {
                value: undefined,
                done: true
            }
        } else {
            result = {
                value: this.data[this.i][this.j],
                done: false
            }
        }
        this.j++

        return result
    }
}

Join.prototype[Symbol.iterator] = function () {
    return new JoinIterator(this);
}


const join = new Join([1, 2], [3, 4]);
for (const el of join) {
    console.log(el);
}