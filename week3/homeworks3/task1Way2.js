const ASCII_VALUES = 256;
function containsSameChars(str1, str2) {
    let arr = new Array(ASCII_VALUES).fill(false);

    for (let i = 0; i < str1.length; i++) {
        arr[str1.charCodeAt(i)] = true;
    }
   /*  for (let i = 0; i < str2.length; i++) {
        arr[str2.charCodeAt(i)] = true;
    } */

    for (let j = 0; j < arr.length; j++) {
        if (arr[str2.charCodeAt(j)]) {
            arr[str2.charCodeAt(j)] = false
        }
    } 


    return !arr.includes(true)
}
let str1 = 'abc';
let str2 = 'cbacw';
let result = containsSameChars(str1, str2);
console.log(result); //true
/* str1 = 'abc';
str2 = 'ab';
result = containsSameChars(str1, str2);
console.log(result); //false
str1 = 'ababc';
str2 = 'abcccc';
result = containsSameChars(str1, str2);
console.log(result); //true */