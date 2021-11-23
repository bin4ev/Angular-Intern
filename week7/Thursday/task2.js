function task2(str) {
  let map = new Map();

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (map.has(char)) {
      map.delete(char);
    } else {
      map.set(char, i);
    }
  }
  
  if (map.size != 0) {
    let iterator = map[Symbol.iterator]();
    let kvp = iterator.next().value;
    return kvp[1];
  }

  return -1;
}

let a = task2("alabalab");
console.log(a); // "alabala" => 3
