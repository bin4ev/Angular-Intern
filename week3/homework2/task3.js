function group(arr, f) {
    return arr.reduce((obj, currEl) => {
        let groupVal = f(currEl)
        if (!obj[groupVal]) {
            obj[groupVal] = []
        }
        obj[groupVal].push(currEl)
        return obj
    },Object.create(null))
}

let a = group(["ivan", "daniela", "ivelina", "dragan", "milen"], (e) => e.charAt(0))
console.log(a);


/* for ( let kvp of Object.entries(a)){
    console.log(`${kvp[0]}=>${kvp[1]}`);
}
 */
