function find(arr, n) {
  let midIdx = Math.floor(arr.length / 2);

  while (true) {
    if (n == arr[midIdx]) {
      return midIdx;
    }

    let [start, end] = n > arr[midIdx] ? [midIdx, arr.length] : [0, midIdx];
    midIdx = Math.floor((end - start) / 2) + start;
    if ((midIdx == 0 || midIdx == arr.length - 1) && arr[midIdx] != n) {
      return -1;
    }
  }
}

var a = [0, 1, 4, 6, 25];
var idx = find(a, 25); // 4
console.log(idx);
/* idx = find(a, 0) // -1 */










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
