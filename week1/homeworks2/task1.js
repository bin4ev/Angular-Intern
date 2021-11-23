function task1(array) {
    for (let index = array.length - 1; index >= 0; index--) {
        const cutElement = array.shift();
        array.splice(index, 0, cutElement);
    }
    console.log(array);
}

task1([1, 2, 3, 4])