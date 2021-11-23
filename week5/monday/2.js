function task2(str) {
    let NOT_REPEAT_VAL = 0
    let obj = Object.create(null)
    for (char of str) {
        obj[char] = obj[char] ? obj[char]+1 : NOT_REPEAT_VAL
       
    }
    for (let i in str) {
        if (obj[str[i]] == NOT_REPEAT_VAL) {
            return  i 
        }
    }

    return -1
}

let a = task2("alabala") // 0
console.log(a);