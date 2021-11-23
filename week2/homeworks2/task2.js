function indexOf(string, searchStr, startIndex) {
    if (searchStr.length > string.length){
        return -1
    }

    let start = startIndex || 0

    for (let i = start; i < string.length-searchStr.length; i++) {
        for (let j = 0; j < searchStr.length; j++) {
            if (searchStr[j] !== string[j + i]) {
                break
            }
            return i
        }
    }

    return -1
}

let a = indexOf("ala bala", "la")
console.log(a);