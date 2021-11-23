function isLeapYear(year) {
    return year % 4 == 0
}

function getDaysFromMouths(mounth, year) {
    if (mounth == 4 || mounth == 6 ||
        mounth == 9 || mounth == 11) {
        return 30
    } else if (mounth == 2) {
        return isLeapYear(year) ? 29 : 28
    } else {
        return 31
    }
}

function addDaysToDate(strDate, n) {
    [day, mounth, year] = strDate.split('-').map(x => Number(x))
    
    day += n
    let currMountDays = getDaysFromMouths(mounth, year)
    if (day > currMountDays) {
        while (day > getDaysFromMouths(mounth, year)) {
            day = Math.abs(day - getDaysFromMouths(mounth, year))
            mounth += 1
            if (mounth > 12) {
                year += 1
                mounth = + 1
            }
        }
    }

    if (day < 10) {
        day = '0' + day
    }
    if (mounth < 10) {
        mounth = '0' + mounth
    }

    return day + '-' + mounth + '-' + year
}

let a = addDaysToDate("31-12-2021", 3)
console.log(a);