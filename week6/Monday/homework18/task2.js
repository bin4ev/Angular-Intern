function sorting(arr) {
    for (let i = 0; i < arr.length; i++) {
        let smallest = arr[i]
        let saveIndex = i
        for (let j = i + 1; j <= arr.length - 1; j++) {
                if (smallest > arr[j]) {
                    smallest = arr[j]
                    saveIndex = j
                }
        }
        let swapEl = arr[i]
        arr[i] = smallest
        arr[saveIndex] = swapEl
    }

    return arr
}

let a = [5, 7, 4, 3, 2, 1]
sorting(a)
console.log(a);