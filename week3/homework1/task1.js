function task1(str) {
    let ABSENT = "О";
    let DELAYED = "З"

    let notHere = 0
    let late = 0
    for (let el of str) {
        switch (el) {
        case DELAYED:
            late += 1
            if (late == 3) {
                return false
            }
            break
        case ABSENT:
            notHere += 1
            if (notHere > 2) {
                return false
            }
        default:
            late = 0
            break;
        }
    }
    return true
}


let a = task1('ЗЗППООЗЗПЗЗП')
console.log(a);
