function sorting(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        let smallest = arr[i]
        let smallestIndex = i
        let biggest = arr[i]
        let biggestIndex = i
        let j = i + 1
        for (; j < arr.length - i; j++) {
            if (smallest > arr[j]) {
                smallest = arr[j]
                smallestIndex = j
            }
            if (biggest < arr[j]) {
                biggest = arr[j]
                biggestIndex = j
            }
        }

        let temp = arr[i]
        arr[i] = smallest
        arr[smallestIndex] = temp
        j--
        temp = arr[j]
        arr[j] = biggest
        if (i == biggestIndex) {
            arr[smallestIndex] = temp
        } else {
            arr[biggestIndex] = temp
        }
    }
}

let a = [4, 3, 2, 5, 1, 0, 6, 43, -2]
sorting(a)
console.log(a);



/*
function swapEl(arr, i, n, nIndex) {
    let saveEl = arr[i]
    arr[i] = n
    arr[nIndex] = saveEl
}
   swapEl(arr, i, smallest, smallestIndex)  */