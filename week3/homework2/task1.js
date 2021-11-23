function task1(date1, date2) {
    let arrDate1 = date1.split('-')
    let arrDate2 = date2.split('-')
    let startMount = Number(arrDate1[1])
    let endMount = Number(arrDate2[1])
    if (startMount == endMount) {
        return Number(arrDate2[0]) - Number(arrDate1[0])
    }

    let totalDays = Number(arrDate2[0])
    for (let i = startMount; i < endMount; i++) {
        const currentMouth = i;
        if (currentMouth == 4 || currentMouth == 6 ||
            currentMouth == 9 || currentMouth == 11) {
            if (startMount == currentMouth) {
                totalDays += 30 - arrDate1[0]
            } else {
                totalDays += 30
            }
        }
        else if (currentMouth == 2) {
            if (checkYaer(arrDate1[2])) {
                if (startMount == currentMouth) {
                    totalDays += 29 - arrDate1[0]
                } else {
                    totalDays += 29
                }
            } else {
                if (startMount == currentMouth) {
                    totalDays += 28 - arrDate1[0]
                } else {
                    totalDays += 28
                }
            }

        } else {
            if (startMount == currentMouth) {
                totalDays += 31 - arrDate1[0]
            } else {
                totalDays += 31
            }
        }
    }

    function checkYaer(year) {
        return year % 4 == 0
    }
   
    return totalDays
}

let a = task1("1-01-2021", "1-02-2021")          //"11-06-2021", "12-06-2021" => 1  
console.log(a);                                    //"1-01-2021", "1-02-2021" => 31