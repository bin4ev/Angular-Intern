function getMaxValueOfMap(map) {
    let maxInt = Number.MIN_SAFE_INTEGER

    for ([_, objValue] of map) {
        value = objValue.value
        if (maxInt < value) {
            maxInt = value
        }
    }

    return maxInt
}

function getKeyByValue(map, searchVal) {
    for (let [key, objValue] of map) {
        if (objValue.value == searchVal) {
            return key;
        }
    }
}

function task3(arrNum) {
    let map = new Map()
    let sortedArr = arrNum.sort()
    for (num of sortedArr) {
        if (map.has(num)) {
            map.get(num).value++
        } else {
            map.set(num, { value: 1 })
        }
    }
    console.log(map);
    let maxValue = getMaxValueOfMap(map)

    return getKeyByValue(map, maxValue)
}

let a = task3([2,3,5,3,7,9,5,3,7])    // => 3
console.log(a);


