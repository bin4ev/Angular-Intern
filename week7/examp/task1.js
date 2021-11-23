let { leapYears1, checkYear} = require ( '../../week6/Thuesday/task4')

function getdaysFromMouths(month, year) {
    if (month > 12 || month < 1) {
        throw 'Month shoud be in valid range is 1 – 12'
    }

    let daysFromMouths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    

    return daysFromMouths[month - 1] + (checkYear(year) ? 1 : 0)
}

function getRestDaysToEndYear(month, year) {
    if (month > 12 || month < 1) {
        throw 'Month shoud be in valid range is 1 – 12'
    }

    month -= 1
    let daysToEnd = [334, 306, 275, 245, 214, 184, 153, 122, 92, 61, 31, 0]

    if (checkYear(year)) {
        return month == 1 ? daysToEnd[month] : daysToEnd[month] - 1
    } // no need

    return daysToEnd[month]
}

function validateDate(date, month, currMontDays) {
    let daysOfWeek = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ]
    if (month > 12 || month < 1) {
        throw 'Month shoud be in valid range is 1 – 12'
    }
    if (date > currMontDays) {
        throw `${daysOfWeek[month - 1]} has only  ${currMontDays} days (Not ${date} as entered)`
    }
}

function task1(d1, d2) {
     /*    validateDate(d1.date, d1.month, currMonthDays)
        validateDate(d2.date, d2.month, currMonthDays2)  */

    let leapYaers = leapYears1(d1.year + 1, d2.year - 1)
    let daysFromYears = ((d2.year - 1) - (d1.year + 1)) * 365

  /*   let currMonthDays = getdaysFromMouths(d1.month, d1.year) */

    let daysToEndYear = getRestDaysToEndYear(d1.month) - d1.date

    let currMonthDays2 = getdaysFromMouths(d2.month, d2.year)

    let daysfromStart = 365 - getRestDaysToEndYear(d2.month) - d2.date

    return daysfromStart + daysToEndYear + daysFromYears + leapYaers
}

let d1 = { date: 28, month: 12, year: 2005 }
let d2 = { date: 28, month: 12, year: 2027 }
let a = task1(d1, d2)
console.log(a);