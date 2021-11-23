function copyArray(arr, toArr, pos) {
    for (let i = 0, j = pos; i < arr.length; i++, j++) {
      toArr[j] = arr[i]
    }
  }
  
  // shifts elements of the array between start index and and the last 'offset' positions left or rigth
  // and resizes the array
  
  function shift(arr, start, offset) {
    if (offset == 0)
      return
    
    if (offset > 0) {   // shift right
      arr.length += offset
      for (let i = arr.length - 1; i > start + offset; i--) 
        arr[i] = arr[i - offset]
    } else {            // shift left
      for (let i = start; i < start - offset; i++) 
        arr[i] = arr[i - offset]
      arr.length += offset
    }
  }
  
  function splice(arr, start, deleteCount, ...items) {
    deleteCount = deleteCount || arr.length - start
    let deleted = arr.slice(start, start + deleteCount)
  
    var itemsLength = items ? items.length : 0
    shift(arr, start, itemsLength - deleteCount)
  
    if (items)
      copyArray(items, arr, start)  
  
    return deleted
  }
  
  var a = [2, 3, 4, 1, 1]
  console.log("before", a)
  var deleted = splice(a, 1, 3, 5, 6)
  console.log("after", a)
  console.log("deleted", deleted)