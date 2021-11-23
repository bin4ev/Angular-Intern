function range(start, end, step = 1) {
    
    return {
        [Symbol.iterator]() {
            let i = start
            return {
                next: () => {
                    if (i > end) return { done: true }
                    let response = {
                        value: i,
                        done: false
                    }
                    i += step
                    return response
                }
            }
        }

    }
}


var a = [...range(1, 10, 2)]

console.log(a);
