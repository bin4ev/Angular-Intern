function before(date1, date2) {
    date1Arr = date1.split('-').map(x => Number(x))
    date2Arr = date2.split('-').map(x => Number(x))

    for (let i = date1Arr.length - 1; i >= 0; i--) {
        let el1 = date1Arr[i];
        let el2 = date2Arr[i]
        if (el1 > el2) {
            return false
        }
        if (el1 < el2) {
            return true
        }
    }

    return false
}

let a = before('11-10-2021', '12-10-2021') // true
console.log(a);