function createElementsWithClass(n, tagName, classN) {
    let arrEl = []
    for (let i = 0; i < n; i++) {
        let el = document.createElement(tagName)
        if (classN) el.className = classN
        arrEl.push(el)
    }

    return arrEl
}

function apend(node, arrEl) {
    for (let el of arrEl) {
        node.appendChild(el)
    }
}

export { createElementsWithClass, apend }