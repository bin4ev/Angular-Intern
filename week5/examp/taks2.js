function isLeapYear(year) {
    return year % 4 == 0
}

function task2(date) {
    let startDayFromMonth = [5, 1, 1, 4, 6, 2, 4, 0, 3, 5, 1, 3]
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let [day, month, year] = date.split('-').map(x => Number(x))
    let currDay = startDayFromMonth[month - 1]
    let skipDays = Math.trunc(year / 4)
    let rotate = (year + skipDays) % weekdays.length

    currDay = (currDay + rotate + (day - 1)) % 7
    if (isLeapYear(year) && (month == 1 || month == 2)) {
        currDay -= 1
    }
    
    return weekdays[currDay]
}

let a = task2("30-11-2021")// =>  (вторник)
console.log(a);
