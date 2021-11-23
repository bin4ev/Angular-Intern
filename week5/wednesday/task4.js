function task4(arr) {
    let countsArr = Array(100).fill(0)
    for (el of arr) {
        countsArr[el] += 1
    }

    let maxCount = 0
    let maxCountIndex
    for (let i = 0; i < countsArr.length; i++) {
        const count = countsArr[i];
        if (maxCount < count) {
            maxCount = count
            maxCountIndex = i
        }
    }

    return maxCountIndex
}
let a = task4([1, 1, 3, 8, 12, 2, 2, 2, 2, 4, 7, 7]) //[2, 2, 2]
console.log(a);