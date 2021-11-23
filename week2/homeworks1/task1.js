function task1(arr, searchElement, fromIndex) {
    let startInd = fromIndex || 0
    for (let i = startInd; i < arr.length; i++) {
        if (arr[i] == searchElement) {
            return i
        }
    }

    return -1
}

let a = task1([1, 2, 3, 0, 12], 12); // [1, 2, 3, 0, 12], 3 => 2
console.log(a);