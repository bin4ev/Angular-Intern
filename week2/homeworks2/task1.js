function  lastIndexOf(arr, searchEl, startIndex) {
    startIndex = startIndex || arr.length-1
    for (let i = startIndex ; i >= 0; i--) {
        if (arr[i] == searchEl) {
            return i
        }
    }

    return -1
}

let a = lastIndexOf([1, 0, 3, 0, 12], 28) // => 3
console.log(a);