function task1(num) {
    const NECESSARY_LENGTH = 32;
    const ONE_BYTE_LENGTH = 8;

    let bytes = num.toString(2);
    let startCutIndex = bytes.length - NECESSARY_LENGTH;
    resultStr = bytes.substr(startCutIndex, NECESSARY_LENGTH);
    let output = [];
    for (let i = 0; i < resultStr.length; i += ONE_BYTE_LENGTH) {
        let oneByte = resultStr.substr(i, ONE_BYTE_LENGTH);
        output.push(parseInt(oneByte, 2));
    }
    console.log(output.join('.'));
    return output.join('.')
}
task1(15.676776766776)
