
function task2(arr) {
    let minInt = Number.MAX_SAFE_INTEGER
    let result = minInt

    for (el of arr) {
        if (minInt >= el) {
            result = minInt
            minInt = el
        } else {
            if (el < result) {
                result = el
            }
        }
    }

    return result == Number.MAX_SAFE_INTEGER ? -1 : result 
}

let a = task2([2,1,0,2,22,2])   // => 2
console.log(a);