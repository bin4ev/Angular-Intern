function splice(arr, startIndex, delCount) {
    startIndex = startIndex > arr.length ? arr.length : startIndex
    delCount = delCount < 0 ? delCount = 0 : delCount
    if (startIndex < 0) {
        startIndex = arr.length + startIndex
    }
    if (delCount >= arr.length - startIndex) {
        arr.length = 0
        return arr
    }

    let map = new Map();
    for (const index in arr) {
        map.set(Number(index), arr[index])
    }

    if (delCount != 0) {
        while (delCount != 0) {
            map.delete(startIndex - 1 + delCount)
            delCount--
        }
    }

    return Array.from(map.values())
}


let a = splice(['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'],0, 1)
console.log(a);