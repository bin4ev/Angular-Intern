function reverce(str, string = '', count = 1) {
    if (string.length == str.length) {
        return string
    }

    return reverce(str, string += str[str.length - count], count + 1)
}
let a = reverce('123')
console.log(a);

/*
abc => cba
123 => 321
 */





