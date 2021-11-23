
function task2(arr) {
    let result = [];
    for (const el of arr) {
        if(!result.includes(el)){
            result.push(el)
        }
    }

    return result
}

let a = task2([1, 3, 8, 1, 16, 3, 4])   //[1, 3, 8,16, 4] 
console.log(a);










/* function option2(arr) {
    let set = new Set(arr);
    return Array.from(set)
}

let b = option2([1, 4, 3, 8, 1, 16, 3,])   //[1, 3, 8,16, 4]
console.log(b);


function option3(arr) {
    return [...new Set(arr)]
}

let c = option3([1, 4, 3, 8, 1, 16, 3,])   //[1, 3, 8,16, 4]
console.log(c); */
