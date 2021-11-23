function splice(arr, startIndex, delCount, ...items) {

    function inRangeForDel(index, start, end) {
        let flag = false
        for (let i = start; i <= end; i++) {
            if (index == i) {
                flag = true
            }
        }
        return flag
    }

    count = 0
    let delItems = []
    for (let i = 0; i < arr.length; i++) {
        if (inRangeForDel(i, startIndex, startIndex - 1 + delCount)) {
            delItems.push(arr[i])
        } else {
            arr[count] = arr[i]
            count++
        }
    }
    arr.length -= delCount

    return delItems
}
let a = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon']
let b = splice(a, 1, 1)
console.log(b);
console.log(a);
