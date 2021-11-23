// task1
function getTagElements(tag) {

    function scanTree(nodeEl, tagname) {
        if (nodeEl.nodeType == Node.ELEMENT_NODE) {
            for (let child of nodeEl.children) {
                if (child.nodeName == tagname) {
                    result.push(child)
                }
                scanTree(child, tagname)
            }
        }
    }

    tag = tag.toUpperCase()
    let result = []
    scanTree(document.documentElement, tag)

    return result
}

let paragr = getTagElements('p')
for (p of paragr) {
    console.log(p.innerHTML)
}


//task2
function addText(strArr) {
    for (let el of strArr) {
        let pEl = document.createElement('p')
        pEl.innerHTML = el
        let bodyEl = document.body
        bodyEl.appendChild(pEl)
    }
}

let paragraphs = ['hello', 'how are you']
addText(paragraphs)


//task3
let bodyEl = document.body
let btn = document.createElement('button')
btn.innerHTML = 'change text'
btn.setAttribute('onclick', "clasify('secret')")
bodyEl.append(btn)

function clasify(text, nodeEl = bodyEl) {
    for (let child of nodeEl.childNodes) {
        if (child.nodeType == Node.TEXT_NODE) {
            child.nodeValue = text
        }
        clasify(text, child)
    }
}


