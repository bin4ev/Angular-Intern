function task1(str1, str2) {
    let set1 = new Set(str1);
    let set2 = new Set(str2)
    if (set1.size !== set2.size) {
        return false
    }

    for (let value of set1) {
        if (!set2.has(value))
            return false
    }

    return true
}

let a = task1("abc", "abcccccc")
console.log(a);

/* => true
"abc", "ab" => false
"ababc", "abcccc" => true) */