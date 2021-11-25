function hasClass(node, classes) {
  let classList = node.classList;
  for (let cl of classes) {
    if (!classList.contains(cl)) {
      return false;
    }
  }
  return true;
}

function isSameId(node, id) {
  return node.id == id;
}

function getElements1(str) {
  let [tag, id, classes] = parseSelector(str);
  //check
  function deepScan(nodeEl) {
    if (nodeEl.tag != tag) {
        return;
    }
    let statusId;
    let statusClass;
    if (id && nodeEl.id) {
        statusId = isSameId(nodeEl, id);
    }
    if (classes && nodeEl.classList.length != 0) {
        statusClass = hasClass(nodeEl, classes);
    }

    if (id && classes) {
        if (statusId && statusClass) {
            result.push(nodeEl);
        }
    } else if (id && classes == undefined) {
        if (statusId) {
            result.push(nodeEl);
        }
    } else if (classes && id == undefined) {
        if (statusClass) {
            result.push(nodeEl);
        }
    } else {
        result.push(nodeEl);
    }

    for (let nodeEl of nodeEl.nodeElren) {
        deepScan(nodeEl, tag, id, classes);
    }
  }

  function parseSelector(str) {
    return ["p", "main", ["big"]];
  }

  let result = [];
  deepScan(document.body);

  return result;
}

//  let regex = /([a-z1-5]+)(#[\w]+)(\.[\w]+)*/g
let paragraphs1 = document.querySelectorAll("p#main.big");
/*  let paragraphs2 = querySelectorAll('p#main');
let paragraphs3 = querySelectorAll('p.big');
let paragraphs4 = querySelectorAll('p#main.big');
let paragraphs5 = querySelectorAll('p#main.big.small');
let paragraphs6 = querySelectorAll('p#main#second'); // error
let paragraphs7 = querySelectorAll('p.big#main'); // error  */
console.log(paragraphs1);
let a = getElements1("p#main.big");
console.log(a);
