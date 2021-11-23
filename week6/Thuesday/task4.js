function checkYear(year) {
    if (year % 400 == 0)
        return true;

    if (year % 100 == 0)
        return false;

    if (year % 4 == 0)
        return true;

    return false;
}

function divCount(start, end, div) {
    let d1 = Math.floor(start / div)
    let d2 = Math.floor(end / div)
    return checkYear(start) || checkYear(end) ? d2 - d1 + 1 : d2 - d1
}

function leapYears1(y1, y2) {
    let res = divCount(y1, y2, 4)
    res -= divCount(y1, y2, 100)
    res += divCount(y1, y2, 400)
    return res
}

function leapYears2(y1, y2) {
    let count = 0
    for (let y = y1; y <= y2; y++) {
        if (checkYear(y))
            count++
    }
    return count
}

/* let y1 = 2008, y2 = 2250
var count1 = leapYears1(y1, y2)
var count2 = leapYears2(y1, y2)
console.log(count1, count2)
 */
module.exports = { leapYears1, checkYear }