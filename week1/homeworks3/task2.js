function task2(str) {
    let arr = str.split('.');
    let result = '';
    arr.forEach(el => {
        let byte = Number(el).toString(2);
        if (byte === "1") {
            byte = "00000001";
        }
        result += byte;
    });
    console.log(parseInt(result, 2));
    return parseInt(result, 2);
}

task2("0.0.1.1");



/* let convertEl=Number(el)
let bits = ''
if (convertEl == 0) {
    bits += 0
} else {
    while (convertEl > 0) {
        let remainder = convertEl % 2
        if (remainder == 1) {
            remainder = '00000001';
        }
        bits += remainder
        let currEl = Math.floor(convertEl / 2)
        convertEl = currEl
    }
}
result += bits; */