function task1(number) {
    let arrNum = []
    while (number) {
        arrNum.push(number % 10)
        number = Math.floor(number / 10)
    }


    let i = 0; j = arrNum.length - 1

    for (; i < arrNum.length; i++) {
        const el = arrNum[i];
        

    }
    return arrNum
}

let a = task1(1234567)  // 16527
console.log(a);