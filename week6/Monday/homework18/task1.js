function isLeapYear(year) {
    return year % 4 == 0
}

function getDaysFromMouths(month, year) {
    if (month == 4 || month == 6 ||
        month == 9 || month == 11) {
        return 30
    } else if (month == 2) {
        return isLeapYear(year) ? 29 : 28
    } else {
        return 31
    }
}

function addDaysToDate(strDate, n) {
    [day, month, year] = strDate.split('-').map(x => Number(x))

    day += n
    if (day >  getDaysFromMouths(month, year)) {
        while (true) {
            let monthDays = getDaysFromMouths(month, year)
            if (day <= monthDays) {
                break
            }
            day = Math.abs(day - monthDays)
            month += 1
            if (month > 12) {
                year += 1
                month = 1
            }
        }
    }

    if (day < 10) {
        day = String(day).padStart(2, '0')
    }
    if (month < 10) {
        month = String(month).padStart(2, '0')
    }

    return  day + '-' + month + '-' + year   

}
let a = addDaysToDate("31-12-2021", 3)
console.log(a);