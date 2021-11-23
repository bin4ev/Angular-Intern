function task2(arr) {
    let count = arr[0]
    let result = []
    tempArr = []
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (el == count) {
            tempArr.push(el)
        } else {
            if (tempArr.length > result.length) {
                result = tempArr
            }
            tempArr = []
            count = el -1
            i--
        }
        count++
    }

    return result
}
let a = task2([0, 5, 1, 2, 3, 4, 5, 2, 8, 9, 10, 11, 12, 13,9, 14, 15, 16, 17, 18, 20])
console.log(a); //0, 5, 1, 2, 3, 4, 5, 2, 8, 9, 10 -> 1, 2, 3, 4, 5