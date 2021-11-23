function task1(str) {
    let regexp = /\d/g
    let match = str.match(regexp)
    if (match == null || match.length == 1 || !match.find(el => el != match[0])) {
        return -1
    }

    return Number(match.sort()[1])
}

let a = task1("0g2ith3ub") // => 2
console.log(a);