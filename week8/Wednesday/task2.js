function sum(str1, str2) {
    if (str1.length > str2.length) {
        [str1, str2] = [str2, str1]
    }

    let sum = [];
    let overflow = 0
    let j = str1.length - 1
    let i = str2.length - 1
    for (; i >= 0; i--, j--) {
        let num1 = Number(str2[i])
        let num2 = j >= 0 ? Number(str1[j]) : 0

        let res = num1 + num2 + overflow;
        overflow = res > 9 ? 1 : 0
        res = res % 10
        sum.unshift(String(res)) // remove unshift
    }

    if (overflow != 0) {
        sum.unshift(overflow);
    }

    return sum.join("");
}

let a = sum("907199254740992", "2"); // 1814398509481984
console.log(a);
/* '1', '2' => '3'
'25', '12' => '37'
'9007199254740992', '1' => '9007199254740993' */