function getElements1(params) {
    function scan(nodeEl, tagName1, tagName2) {
        for (let child of nodeEl.children) {
            if (child.tagName == tagName1 && child.nextElementSibling &&
                 child.nextElementSibling.tagName == tagName2) {
                result.push(child.nextElementSibling)
            }
            scan(child, tagName1, tagName2)
        }
    }

    let result = []
    scan(document.body, 'IMG', 'P')

    return result
}

let nodeList1 = document.querySelectorAll('img + p')
console.log(nodeList1);
let nodeList2 = getElements1()
console.log(nodeList2);
// nodeList1 same as nodelist2