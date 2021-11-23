function getElements1(params) {
    function scan(nodeEl, tagName, searchTag) {
         if(!nodeEl) {
            return
        } 

        for (let child of nodeEl.children) {
            if (child.tagName == tagName) {
                child = child.nextElementSibling
                while (child) {
                    if (child.tagName == searchTag) {
                        result.push(child)
                    }
                    child = child.nextElementSibling
                }
            }

            scan(child, tagName, searchTag)
        }
    }

    let result = []
    scan(document.body, 'IMG', 'P')

    return result
}

let nodeList1 = document.querySelectorAll('img ~ p')
console.log(nodeList1);
let nodeList2 = getElements1()
console.log(nodeList2);
// nodeList1 same as nodelist2