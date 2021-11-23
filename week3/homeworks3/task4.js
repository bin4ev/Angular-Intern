class Arr  {
    constructor(arr) {
        this.arr = arr
    }

    max(func) {
        let maxValue = this.arr.reduce((acc, curr) => {
            if (!func) {
                return acc > curr ? acc : curr
            }
            if (typeof acc == 'object') {
                return func(acc, curr) ? acc : curr
            }

            return func(acc, curr)
        })

        return maxValue
    }
}
var people = [
    { name: "Ivan", age: 25 },
    { name: "Niki", age: 33 },
    { name: "Desi", age: 12 }
]
var a = new Arr(people)
var oldest = a.max((p1, p2) => p1.age > p2.age)
console.log(oldest.name)

// Niki
/*
let a = new Arr([1, 2, 10, 12])
var m = a.max(Math.max) // 5
console.log(m);
 */


