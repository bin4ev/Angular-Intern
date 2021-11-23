function rotate(arr, n) {
    n = n % arr.length
    if (n == 0)
      return

    let temp = arr[0]
    for (let i = 0, j = 0; j < arr.length; j++) {
        i = (i + n) % arr.length;
        [temp, arr[i]] = [arr[i], temp] 
    }
}

// 1, 2, 3, 4, 5
// 1, 2, 1, 4, 5 // temp = 3
// 1, 2, 1, 4, 3 // temp = 5
//!!!! wrong
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
rotate(a, 6)
console.log(a);