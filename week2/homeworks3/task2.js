function task2(str) {
    /* let arr = Array.from(str)
    let counter = 1

    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        if (el == '#') {
            arr[i - counter] == '' ? arr[i - counter - 1] = '' : arr[i - counter] = ''
            arr[i] = ''
            counter++

        }
    }

    return arr.join('') */
        let result = [];
      
        for (let el of str) {
          if (el === '#') {
            result.pop();
          } else {
            result.push(el);
          }
        }
      
        return result.join('');
      }

let a = task2("a##bc");
console.log(a);