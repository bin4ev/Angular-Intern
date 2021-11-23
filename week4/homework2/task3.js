class Range {  
    constructor(start, end) {
      this.start = start
      this.end = end
    }
  
    contains(n) {
      return this.start <= n && n <= this.end;
    }
  
    overlap(r) {    
      return this.contains(r.start) || this.contains(r.end)
    }
  
    merge(r) {
      if (!this.overlap(r))
        return false
  
      this.start = Math.min(this.start, r.start)
      this.end   = Math.max(this.end, r.end)
  
      return true
    }
  
    toString() {
      return `{${this.start}, ${this.end}}`
    }
  }
  
  function mergeIntervals(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].merge(arr[j])) {
          // arr.splice(j, 1) 
          let lastIndex = arr.length - 1
          if (j != lastIndex) {
            arr[j] = arr[lastIndex]
            j--
          }
          arr.length -= 1
        }
      }
    }
  }
  
  var a = [[1, 2], [4, 8], [3, 4]]
  var ra = a.map(r => new Range(r[0], r[1]))
  mergeIntervals(ra)
  a = ra.map(r => [r.start, r.end])
  console.log(a)