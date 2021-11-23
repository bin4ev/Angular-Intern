function task3(str) {
    let charStr = ''
    let numStr = ''
    for (let i = 0; i < str.length; i++) {
        const el = str[i];
        if (Number(el)) {
            numStr += el
        } else {
            charStr += el
        }
    }
    if (numStr == '' || charStr == '') {
        return ''
    }

    let result = ''
    let lastEL
    let flag = false
    for (let j = 0; j < str.length; j++) {
        if (charStr[j]) {
            if (flag) {
                if (!Number(lastEL)) {
                    return ''
                }
            }
            result += charStr[j]
            flag = true
        }
        if (numStr[j]) {
            lastEL = result[result.length - 1]
            if (Number(lastEL)) {
                return ''
            }

            result += numStr[j]
        }
        lastEL = result[result.length - 1]
    }

    return result
}
let a = task3("abc120d") // "a1b2c3d"
console.log(a);