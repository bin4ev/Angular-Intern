
//да се напише функция която получава като параметър string и връща boolen. резулата да е true ако входния стринг е съставен от последователно пореден друг стринг.

function task1(str) {
    let compareStr1 = str[0]
    let compareStr2 = ''

    for (let i = 1; i < str.length; i++) {
        const el = str[i];
        if (el != str[0]) {
            compareStr1 += el
        } else {
            if (i !== str.length - 1) {
                if (el == str[i + 1]) {
                    compareStr1 += el
                } else {
                    compareStr2 += el
                    for (let j = i + 1; j < str.length; j++) {
                        const element = str[j];
                        if (element == str[j - compareStr1.length])
                            compareStr2 += element
                    }
                    break
                }

            } else {
                return true
            }
        }
    }

    return compareStr2 == compareStr1
}

let a = task1('ababab');    // => true
console.log(a);