//task1
function getElements1(str) {
    function deepScan(nodeEl, tagname) {
        for (let child of nodeEl.children) {
            if (child.tagName == tagname) {
                result.push(child)
            }
            deepScan(child, tagname)
        }
    }

    let [inTag, findAllTag] = str.split(' ').map(x => x.toUpperCase())
    let result = []

    for (let node of document.body.children) {
        if (node.tagName == inTag) { //wrong
            deepScan(node, findAllTag)
        }
    }

    return result
}

/*  let nodeList1 = document.querySelectorAll('p a')
console.log(nodeList1);
let nodeList2 = getElements1('p a')
console.log(nodeList2);  */
// nodeList1 same as nodelist2

//task2
function getElements2(str) {
    let [inTag, findTag] = str.split(' ')
        .filter(x => x >= 'a' && x <= 'z')
        .map(x => x.toUpperCase())
        
    let result = []

    for (let node of document.body.children) {
        if (node.tagName == inTag) {
            for (let el of node.children) {
                if (el.tagName == findTag) {
                    result.push(el)
                }
            }
        }
    }

    return result
}

/* let nodeList3 = document.querySelectorAll('p > a')
console.log(nodeList3);
let nodeList4 = getElements2('p > a')
console.log(nodeList4); */
// nodeList3 same as nodelist4



function getElements3(str) {
    function deepScan(nodeEl, tagNAme, id, className) {
        for (let child of nodeEl.children) {
            if (child.tagName == tagNAme && child.id == id && child.className == className) {
                result.push(child)
            }
            deepScan(child,tagNAme, id, className)
        }
    }
    
    let result = []
    deepScan(document.body, 'P', 'main', 'big') //class check

    return result
}

let nodeList5 = document.querySelectorAll('p#main.big')
console.log(nodeList5);
let nodeList6 = getElements3('p#main.big')
console.log(nodeList6);
// nodeList5 same as nodelist6