function filter(arr, func) {
    return arr.reduce((acc, curr) => {
        if (func(curr)) {
             acc.push(curr)
        }
        
      return acc
    },[])
}
let a = filter([1, 2, 3, 4], e => e % 2 == 0)
console.log(a);