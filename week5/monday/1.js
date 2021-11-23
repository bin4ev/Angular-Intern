function task1(arr1, arr2) {
    let result = []
    if (arr1.length < arr2.length) {
        [arr1, arr2] = [arr2, arr1]
    }
    for (el of arr1) {
        if (arr2.some(element => element == el)) {
            result.push(el)
        }
    }

    return result
}
let a = task1([1, 2, 3, 8], [2, 5, 8,10]) //=> [2, 8]
console.log(a);