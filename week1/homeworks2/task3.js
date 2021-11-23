function task3(str, num) {
    const START_ASCII_CODE = 97;
    const END_ASCII_CODE = 122;
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const el = str[i];
        let positionLetter = el.charCodeAt();
        positionLetter += num;
        if (positionLetter > END_ASCII_CODE) {
            positionLetter -= END_ASCII_CODE;
            positionLetter += START_ASCII_CODE;
            positionLetter -= 1;
        }
        result += String.fromCodePoint(positionLetter);
    }

    console.log(result);
}
task3('z', 5)
/* a, 1 => b
a, 2 => c
z, 1 => a */