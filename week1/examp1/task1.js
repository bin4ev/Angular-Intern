function task1(arr, num) {
    let obj = {}
    for (let el of arr) {
        obj[el] = el
    }
    let sortedArr = Object.values(obj)
    let result = sortedArr.reverse()
    result.length = num
    return result

}

task1([1, 12, 13, 6, 14, 3], 4)

var a = task1([1, 8, 0, 6, 3], 3)
console.log(a);