function sum(str1, str2) {
    if (str1 > str2) {
        [str1, str2] = [str2, str1];
    }

    let sum = [];
    let j = str1.length - 1;
    let oneInMind = 0
    for (let i = str2.length - 1; i >= 0; i--, j--) {
        let num1 = Number(str2[i]);
        let num2 = 0
        if (j >= 0) {
            num2 = Number(str1[j])
        }

        if (oneInMind != 0) {
            num1 += Number(oneInMind);
        }

        let res = num1 + num2;
        if (res > 9) {
            res = res.toString();
            oneInMind = Number(res.slice(0, res.length - 1));
        } else {
            oneInMind = 0;
            res = res.toString()
        }

        sum.unshift(res[res.length - 1]);
    }

    if (oneInMind != 0) {
        sum.unshift(oneInMind);
    }

    return sum.join("");
}

let a = sum("907199254740992", "907199254740992"); // 1814398509481984
console.log(a);
/* '1', '2' => '3'
'25', '12' => '37'
'9007199254740992', '1' => '9007199254740993' */