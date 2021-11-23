function task1(str) {
    let compareStr1 = str[0]

    for (let i = 1; i < str.length; i++) {
        const el = str[i];
        if (el != str[0]) {
            compareStr1 += el
        } else {
            if (i !== str.length - 1) {
                if (el == str[i + 1]) {
                    compareStr1 += el
                } else {
                    for (let j = 0; j < compareStr1.length; j++) {
                        const element = compareStr1[j];
                        if (element !== str[j + compareStr1.length]) {
                            return false
                        }
                    }
                    return true
                }
            } else {
                return false
            }
        }
    }
    if (compareStr1.length = 2) {
        return compareStr1[0] == compareStr1[1]
    }


}

let a = task1('alaalaalab');    // => true
/* 
ababab => true
aabb => false
abcabc => true
aaaaa => true
aab => false */
console.log(a);