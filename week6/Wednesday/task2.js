function task2(arr) {
    let max = -Infinity
    let maxIndex
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i]
        if (max < el) {
            max = el
            maxIndex = i
        }
    }

    for (let j = 0; j < arr.length; j++) {
        if (j != maxIndex && arr[j] * 2 > max) {
            return undefined
        }
    } 

    return max
}

let a = task2([1, 2, 3, 5, 6] ) // => 6
console.log(a);