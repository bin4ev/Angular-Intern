function group(arr, f) {
    let resultObj = Object.create(null)

    for (let el of arr) {
        let groupValue = f(el)
        if(!resultObj[groupValue]){
            resultObj[groupValue] = []
        }
            resultObj[groupValue].push(el)
    }

    return resultObj
}

var a = ["ivan", "daniela", "ivelina", "dragan", "milen"]
var res = (a, (e) => e.charAt(0))
let v = group(a, res)


let result = Object.entries(v)
for (let el of result) {
    console.log(el[0], el[1]);
}
