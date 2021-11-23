function isLeapYear(year) {
    return year % 4 == 0
}

function getdaysFromMouths(month) {
    let daysFromMouths = [31, 28, 31, 30, 31, 30, 37, 31, 30, 31, 30, 31]
    if(month > 12 || month < 1) {
        return undefined
    }
     return daysFromMouths[month - 1]
}

class Range {
    constructor(start, end) {
        this.start = start
        this.end = end
    }

    inRange(n) {
        return n >= this.start && n <= this.end
    }
}

function validDate(strDate) {
    [day, month, year] = strDate.split('-').map(x => Number(x))
    let daysFromMouths = getdaysFromMouths(month)
    if (!daysFromMouths) {
        return false
    }

    if (daysFromMouths == 31) {
        let range = new Range(1, 31)
        return range.inRange(day)

    } else if (daysFromMouths == 30) {
        let range = new Range(1, 30)
        return range.inRange(day)

    } else if (daysFromMouths == 28) {
        let range = new Range(1, 28)
        let leapYearRange = new Range(1, 29)
        return isLeapYear(year) ? leapYearRange.inRange(day) : range.inRange(day)
    }
}

let a = validDate("2-01-2012")
console.log(a);