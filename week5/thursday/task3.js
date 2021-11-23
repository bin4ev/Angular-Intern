function task3(arrNum) {
    for (let i = 1; i < arrNum.length; i++) {
        let iElement = arrNum[i]
        if (iElement % 2 == 1) {
            for (let j = 0; j < arrNum.length; j++) {
                let jElement = arrNum[j]
                if (jElement % 2 == 1) {
                    let tempEl = arrNum[i];
                    if (iElement < jElement) {
                        arrNum[i] = jElement;
                        arrNum[j] = tempEl
                    }
                }
            }
        }
    }
    return arrNum;

}
let a = task3([5, 3, 2, 8, 1, 4, 7, 9]) // [1, 3, 2, 8, 5, 4]
console.log(a);