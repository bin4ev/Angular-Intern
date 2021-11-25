/* function find(arr, n) {
  let midIdx = Math.floor(arr.length / 2);

  while ((midIdx == 0 || midIdx == arr.length - 1) && arr[midIdx] != n) {
    if (n == arr[midIdx]) {
      return midIdx;
    }

    let [start, end] = n > arr[midIdx] ? [midIdx, arr.length] : [0, midIdx];
    midIdx = Math.floor((end - start) / 2) + start;
  }

  return -1;
}

var a = [0, 1, 4, 6, 25];
var idx = find(a, 25); // 4
console.log(idx); */
/* idx = find(a, 0) // -1 */

function find(arr, e) {
  let start = 0, end = arr.length - 1
  while (start < end) {
    let mid = Math.round((end - start) / 2)
    if (e === arr[mid])
      return mid
    if (e > arr[mid]) {
      start = mid +1
    } else {
      end = mid
    }    
  }
  return -1
}

let a = [1, 5, 8, 9]
let i = find(a, 1)
console.log(i)









/* 
    function find(arr, n) {
        let coppyArr = arr.slice()
        let midIdx = Math.floor(arr.length / 2)
        if (n == arr[midIdx]) {
            return midIdx
        }
        let [start, end] = n > arr[midIdx] ? [midIdx, arr.length] : [0, midIdx]
    
        while (true) {
            midIdx = Math.floor((end - start) / 2) + start
            if (n == arr[midIdx]) {
                return midIdx
            }
            if (midIdx == start) {
                break
            }
            [start, end] = n > arr[midIdx] ? [midIdx, end] : [start, midIdx]
        }
    
        return -1
    }
     */
