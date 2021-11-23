function option2(arr, rotate) {
    if (rotate < 1 || arr.length <=1 || arr.length == rotate) {
        return 
    } 
    rotate =rotate % arr.length
    while (rotate) {
        let last = arr[arr.length - 1]
        for (j = arr.length - 1; j > 0; j--) {
            arr[j] = arr[j - 1]
        }
        arr[0]= last

        rotate--
    }
}

let b = option2([1, 2, 3, 4], 2) // => [3, 4, 1, 2]
console.log(b); 
/* 

function task3(arr, rotate) {
    if(rotate < 1 || arr.length <=1 || arr.length == rotate){
        return 
    } 
    while (rotate % arr.length) {
        let lastEl = arr.pop()
        arr.unshift(lastEl)
        rotate--
    }

    return arr
}

let a = task3([1, 2, 3, 4], 2) // => [3, 4, 1, 2]
console.log(a); */