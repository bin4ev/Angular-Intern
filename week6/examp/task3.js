function isDigit(symb) {
  return symb >= '0' && symb <= '9'
}

function task3(str) {
  let usedDot = false, usedExpon = false
  let charSet = new Set('e.-+')
  let firstEL = str[0]
  if (str.length == 1 && !isDigit(str[0])) {
    return false
  }

  if (!isDigit(firstEL) && firstEL != '-' && firstEL != '+') {
    return false
  }

  for (let i = 1; i < str.length; i++) {
    let el = str[i]
    if (i == 1 && firstEL == '-' || firstEL == '+') {
      if (!isDigit(el) || el == 'e' || el == '.' || el == '-' || el == '+') {
        return false
      }
    } else if (!isDigit(el) && el !== 'e' && el !== '.' && el != '-' && el != '+') {
      return false
    }

    if (el == '.') {
      if (usedDot || usedExpon) {
        return false
      }

      if (i != str.length - 1 && !isDigit(str[i + 1]) && str[i + 1] != 'e') {
        return false
      }
      usedDot = true

    } else if (el == 'e') {
      if (usedExpon) {
        return false
      }
      if (i == str.length - 1) {
        return false
      }

      let followedEl = str[i + 1]
      if (!isDigit(followedEl) && followedEl != '+' && followedEl != '-') {
        return false
      }

      usedExpon = true
    }

    if (i == str.length - 1) {
      if (!isDigit(el) && el !== '.') {
        return false
      }
    }
  }
  return true
}
/* 
  let a = task3("1.")
console.log(a);   */


function isValidNum(s) {
  return task3(s)
}

function test(s, expected) {
  var res = isValidNum(s)
  if (res != expected) {
    console.log(`${s} => expected ${expected} but got ${res}`)
  } else {
    console.log('all done !');
  }
}

let patterns = [
  "0", "123", "+", "+12", "-12", "-+12", "12+",
  ".", "0.1", "1.", "1.0.1",
  ".e12", "123e", "123.e1", "123.e-1",
  "123e1.", "123e1", "123e1e2",
  "123abc", "abc", "123eabc"
]

patterns.forEach(p => {
  let num = Number(p)
  let expected = !Number.isNaN(num)
  test(p, expected)
})