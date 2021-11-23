function task1(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        console.log(i+1);
        if (arr[i] < arr[i + 1] || i == arr.length - 1) {
            result.push(arr[i])
        }

    }

    return result;
}
let a = task1([1, 2,]);   //[1, 2, 3, 4, 5]
console.log(a);