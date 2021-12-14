function* average(n) {
    let container = []
    let sum = 0, idx = 0, nextVal = 0

    while (true) {
        if (container.length < n) {
            nextVal = yield 
            container.push(nextVal)
            sum += nextVal
            continue
        }

        nextVal = yield sum / n
        idx = idx % n
        sum -= container[idx]
        sum += nextVal
        container[idx] = nextVal
        idx++
    }
}

let avg = average(3)
let a = [1, 2, 3, 4, 5, 6,]
 for (let i of a) {
   let nextAvg = avg.next(i)
    console.log(nextAvg.value)
}