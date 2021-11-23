 function task2(arr) {
    let min = Math.min(...arr)
    let max = Math.max(...arr)

    for (let i = min; i < max; i++) {
        if (!arr.includes(i)) {
            return i
        }
    }
}

let a = task2([1, -1, 3, 2]) //=> 0
console.log(a);

function task2(arr) {
    let maxInt = Number.MIN_SAFE_INTEGER
    let minInt = Number.MAX_SAFE_INTEGER

    for (el of arr) {
        if (maxInt < el) {
            maxInt = el
        }
        if (minInt > el) {
            minInt = el
        }
    }
    for (let i = minInt; i < maxInt; i++) {
        if (arr.indexOf(i) == -1) {
            return i
        }
    }
}
let a = task2([1, -1, 3, 2]) //=> 0
console.log(a); 