function task3(arr) {
    let firstEl = arr[0];
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i + 1]
    }
    arr.length = arr.length - 1

    return firstEl
}

let c = task3([1, 2, 3, 0, 12]);  // 1
console.log(c);
