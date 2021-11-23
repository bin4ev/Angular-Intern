function getDigitAndMaxRepeat(arr1, arr2) {
    let repeatDig
    let maxRepeatCount = Number.MIN_SAFE_INTEGER
    for (let j = 0; j < arr1.length; j++) {
        const el = arr1[j];
        if (maxRepeatCount < arr2[el]) {
            maxRepeatCount = arr2[el]
            repeatDig = arr1[j]
        }
    }

    return { repeatDig, maxRepeatCount }
}

function task1(arr) {
    let compArr = new Array(100).fill(0)
    for (let el of arr) {
        compArr[el] += 1
    }

    let result = []
    while (true) {
        let { repeatDig, maxRepeatCount } = getDigitAndMaxRepeat(arr, compArr)
        if (maxRepeatCount == 0) {
            break
        }

        while (maxRepeatCount != 0) {
            result.push(repeatDig)
            maxRepeatCount--
        }

        compArr[repeatDig] = 0
    }

    return result
}

let a = task1([2, 3, 5, 3, 7, 9, 5, 3, 7]) // [3,3,3,5,5,7,7,2,9]
console.log(a);
