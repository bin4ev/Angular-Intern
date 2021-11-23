function task2(arr,searchElement,startIndex) {
    let startInd = startIndex || 0
    for (let i = startInd; i < arr.length; i++) {
        if (arr[i] == searchElement) {
            return true
        }
    }

    return false
}

let b =task2([1, 2, 3, 0, 12], 2);  //true
console.log(b);