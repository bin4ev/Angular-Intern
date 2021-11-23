function task3(arr, n) {
    let map = new Map()
    let minKey = +Infinity

    for (let i in arr) {
        let el = arr[i]
        if (el > n) {
            map[el - n] = i
            if (minKey > el - n) {
                minKey = el - n
            }
        }
    }

    return arr[map[minKey]]
}

let a = task3([1, 3, 6, 2, 7], 5)
console.log(a);
