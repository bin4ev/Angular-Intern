function task1(str) {
    let obj = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    
    let stack = []
    for (let el of str) {
        if (!obj[el]) {
            let lastOpen = stack.pop()
            if (obj[lastOpen] !== el) {
                return false
            }
        } else {
            stack.push(el)
        }
    }

    return true
}

let a = task1("{[]}")
console.log(a);
/* "()" => true
"()[]{}" => true
"(]" => false
"([)]" => false
"{[]}" => true */