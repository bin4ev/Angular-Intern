function task3(str1, str2) {
    let set = new Set(str1);
    let result = '';

    for (let char of str2) {
        if (set.delete(char)) {
            result += char
        }
    }

    return result;
}

let a = task3("abc", "daaafc");  //=> "ac"
console.log(a);