function mergeIntervals(arr) {
    arr.sort()
    let result = [[arr[0][0], arr[0][1]]]
    for (let index = 0; index < arr.length; index++) {
      if (arr[index][0] <= result[result.length - 1][1]) {
        result[result.length - 1][1] = Math.max(result[result.length - 1][1], arr[index][1])
      } else {
        result.push(arr[index])
      }
    }
    if (result.length === 1) {
      return result[0]
    } else {
      return result
    }
  }
  let result = (mergeIntervals([[1, 5], [4, 7], [6, 8]]))
  console.log(result)