function task3(arrNum) {
    let set = new Set(arrNum)
    let result = []
    for (el of set) {
        result.push(el)
    }

    return result
}

let a = task3([3, 12, 5, 12, 8, 5 ]) //3, 12, 5, 8
console.log(a);