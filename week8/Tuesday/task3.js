let { StringBuilder } = require("../../week6/Thursday/task2.js");

function checkStr(s1, s2) {
  if (s1.length != s2.length) {
    return false;
  }

  let concat = s1 + s1;
  let str = new StringBuilder(concat);

  return str.indexOf(s2) != -1;
}

let s1 = "alabala";
let s2 = "aalabal";
let a = checkStr(s1, s2); //  "alabala", "balaala" => true
console.log(a);           //  "hello", "olleh" => false 



function test(str1, str2, expect) {
  let res = checkStr(str1, str2);
  if (res != expect) {
    console.log(`${(s1, s2)} => expect ${expect} but has ${res}`);
  } else {
    console.log("all done !");
  }
}

function rotate(s1, s2) {
  let arr2 = s2.split("");
  let count = s1.length - 1;
  while (count > 0) {
    let last = arr2.pop();
    arr2.unshift(last);
    let str = arr2.join("");
    if (s1.localeCompare(str) == 0) {
      return true;
    }

    count--;
  }

  return false;
}

let expect = rotate(s1, s2);
test(s1, s2, expect);
