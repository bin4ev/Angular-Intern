function firstNonRepeating(s) {
    var repeated = new Set()
    var single = new Set()
    let obj = {}
    for (let i = 0; i < s.length; i++) {
        let ch = s[i]
        if (repeated.has(ch))
            continue;
        if (single.has(ch)) {
            single.delete(ch);
            repeated.add(ch);
        } else {
            single.add(ch);
            obj[ch] = i
        }
    }

    let values = single.values(); // 👉️ iterator
    let next = values.next()
    return obj[next.value]
}


let s = "yababt";
let ch = firstNonRepeating(s);
console.log(ch);