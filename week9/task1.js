const TAG = 0, CLASS = 1, ID = 2

function parseSelector(s) {
  function endWord() {
    if (state != TAG && word.length == 0)
      throw "empty item"
    if (state == ID && id || CLASS && state == ID) {
      throw 'error'
    }

    switch (state) {
      case ID:
        id = word
        break
      case TAG:
        tag = word
        break
      case CLASS:
        classList.push(word)
        break
    }
    word = ''
  }

  let tag, id
  let classList = []
  let word = ''
  let state = TAG

  for (let ch of s) {
    switch (ch) {
      case '.':
        endWord()
        state = CLASS
        break
      case '#':
        endWord()
        state = ID
        break
      default:
        word += ch
    }
  }
  endWord()

  return { tag, id, classList }
}

function querySelectorAll(s) {
  let sel = parseSelector(s)
  console.log(s)
  console.log(sel.tag, sel.id, sel.classList)
  console.log()
}

let paragraphs6 = querySelectorAll('p#id.class');
/* let paragraphs5 = querySelectorAll('p#main.big.small'); */
/* let paragraphs1 = querySelectorAll('p'); */
/* let paragraphs2 = querySelectorAll('p#main'); */
/* let paragraphs3 = querySelectorAll('p.big');
let paragraphs4 = querySelectorAll('p#main.big');
let paragraphs5 = querySelectorAll('p#main.big.small');
let paragraphs6 = querySelectorAll('p#main#second'); // error
let paragraphs7 = querySelectorAll('p.big#main'); // error */