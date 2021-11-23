function findSumElements(arr, target) {
    let set = new Set()
    for (let el of arr) {
        let el2 = target - el
        if (set.has(el2) && el2 !== el ) {
            return [el, el2]
        }
        set.add(el)
    }

    return undefined
}

pair = findSumElements([1, 2, 5, -1], 1)
console.log(pair) // [2, -1]