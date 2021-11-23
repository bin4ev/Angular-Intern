function slice(arr, startIndex, endIndex) {
    startIndex = startIndex || 0;
    endIndex = endIndex || arr.length;

    if (startIndex > arr.length)
        return [];

    let resultArr = [];
    function pushELfromTheIndex(index, arr) {
        for (let j = arr.length - 1 + index; j < arr.length; j++) {
            if (index == 0) {
                return
            }
            resultArr.push(arr[j])
            index++
        }

    }
    if (endIndex < 0) {
        resultArr.push(arr[startIndex])
        /*   startIndex+=arr.length */
        pushELfromTheIndex(endIndex, arr)
        return resultArr
    }
    if (startIndex < 0) {
        /*    startIndex+=arr.length */
        pushELfromTheIndex(startIndex, arr)
        return resultArr
    }

    for (let i = startIndex; i < endIndex; i++) {
        resultArr.push(arr[i])
    }



    return resultArr
}

let a = slice(['ant', 'bison', 'camel', 'duck', 'elephant'], -3, 1)
console.log(a);