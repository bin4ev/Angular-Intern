function commonNums(a1, a2) {
    let result = []
    if (a1.length < 1 || a2.length < 1)
     return result
  
    let i1 = 0, i2 = 0
  
    do {
      let n1 = a1[i1], n2 = a2[i2]
      if (n1 == n2) {
        result.push(n1)
        for (; a1[i1] == n1 && i1 < a1.length; i1++); 
        for (; a2[i2] == n1 && i2 < a2.length; i2++);
      } else if (n1 < n2) {
        for (; a1[i1] < n2 && i1 < a1.length; i1++);
      } else {
        for (; a2[i2] < n1 && i2 < a2.length; i2++);
      }
    } while (i1 < a1.length && i2 < a2.length) 
  
    return result
  }