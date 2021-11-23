function task2(array) {
    let newArr = [];
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
        newArr.push(sum);
    }
}

task2([1, 2, 3])
