function getMinFromArr(arr) {
    let maxInt = Number.MIN_SAFE_INTEGER
    let minInt = Number.MAX_SAFE_INTEGER

    for (el of arr) {
        if (maxInt < el) {
            maxInt = el
        }
        if (minInt > el) {
            minInt = el
        }
    }
}

module.exports = {
    getMinFromArr,
}
