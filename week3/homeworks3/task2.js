function flatten(...params) {
    return params.reduce((arr, curr) => {
        if (Array.isArray(curr)) {
            for (let i of curr) {
                arr.push(i);
            }
        } else {
            arr.push(curr)
        }

        return arr
    },[])
}
let a = flatten([1, 2], 3, [4], 5)
console.log(a);